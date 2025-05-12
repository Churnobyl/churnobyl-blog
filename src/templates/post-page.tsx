import { graphql, PageProps } from "gatsby";
import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ScrollToTop from "react-scroll-to-top";
import PostInteractions from "../components/interaction/postInteraction";
import NormalLayout from "../components/layout/normalLayout";
import PostButtonSet from "../components/post/postButtonSet";
import PostTitleSet from "../components/post/postTitleSet";
import { SEO } from "../components/seo/seo";
import UpSvg from "../images/upSvg";
import { IPost } from "../interfaces/IPost";
import MdxGenerator from "../mdx/mdxGenerator";

const BookSlider = lazy(() => import("../components/bookSlider/bookSlider"));
const TableOfContents = lazy(
  () => import("../components/tableOfContents/tableOfContents")
);
const RelatedPost = lazy(() => import("../components/post/relatedPost"));
const CommentGiscus = lazy(
  () => import("../components/comments/commentGiscus")
);

interface PostPageContext {
  pageId: string;
}

// 세션 스토리지 상태 관리 함수
const getSessionStorage = (key: string, defaultValue: any) => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const saved = sessionStorage.getItem(key);
    if (saved) return JSON.parse(saved);
    return defaultValue;
  } catch (e) {
    console.error("세션 스토리지 읽기 오류:", e);
    return defaultValue;
  }
};

const setSessionStorage = (key: string, value: any) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("세션 스토리지 쓰기 오류:", e);
  }
};

// 디바운스 함수 구현
const debounce = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
};

const PostTemplate: React.FC<PageProps<IPost, PostPageContext>> = ({
  data,
}) => {
  const {
    title,
    book,
    book_index,
    category_list,
    content,
    create_date,
    description,
    id,
    tags,
    update_date,
    url,
    version,
    tableOfContents,
    thumbnail,
  } = data.churnotion;

  const relatedPosts = data.relatedPost.posts;

  // 이전에 API 호출이 완료되었는지 확인
  const hasLoadedFromSession = useMemo(
    () => (url ? getSessionStorage(`post_loaded_${url}`, false) : false),
    [url]
  );

  // 세션 스토리지에서 초기값 로드
  const initialViewCnt = useMemo(
    () => (url ? getSessionStorage(`post_view_${url}`, 0) : 0),
    [url]
  );
  const initialLikeCnt = useMemo(
    () => (url ? getSessionStorage(`post_like_${url}`, 0) : 0),
    [url]
  );
  const initialLiked = useMemo(
    () => (url ? getSessionStorage(`post_liked_${url}`, false) : false),
    [url]
  );

  const [viewCnt, setViewCnt] = useState(initialViewCnt);
  const [likeCnt, setLikeCnt] = useState(initialLikeCnt);
  const [liked, setLiked] = useState(initialLiked);
  const [isAPILoading, setIsAPILoading] = useState(false);

  // 이미 API 호출을 시도했는지 추적하는 ref
  const apiCalledRef = useRef(false);

  // 디바이스 ID 메모이제이션
  const deviceId = useMemo(() => {
    if (typeof window === "undefined") return "";

    try {
      const storedId = localStorage.getItem("device_id");
      if (storedId) return storedId;

      const newId = crypto.randomUUID();
      localStorage.setItem("device_id", newId);
      return newId;
    } catch (e) {
      console.error("로컬 스토리지 접근 오류:", e);
      return Date.now().toString(); // 폴백
    }
  }, []);

  // API 호출 함수 메모이제이션 - useCallback 사용
  const fetchInteractionData = useCallback(async () => {
    // 이미 API 호출을 했거나 로딩 중이면 건너뛰기
    if (apiCalledRef.current || isAPILoading || !url || !deviceId) {
      return;
    }

    // 이미 세션에 데이터가 로드되어 있으면 건너뛰기
    if (hasLoadedFromSession) {
      return;
    }

    apiCalledRef.current = true;
    setIsAPILoading(true);

    try {
      const response = await fetch(`/api/interact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, type: "view", deviceId }),
      });

      if (!response.ok) {
        throw new Error(`API 응답 오류: ${response.status}`);
      }

      const data = await response.json();

      setViewCnt(data.viewCnt || 0);
      setLikeCnt(data.likeCnt || 0);
      setLiked(data.liked || false);

      // 세션 스토리지에 저장
      setSessionStorage(`post_view_${url}`, data.viewCnt || 0);
      setSessionStorage(`post_like_${url}`, data.likeCnt || 0);
      setSessionStorage(`post_liked_${url}`, data.liked || false);
      setSessionStorage(`post_loaded_${url}`, true);
    } catch (error) {
      console.error("조회수 또는 좋아요 상태 가져오기 실패:", error);
    } finally {
      setIsAPILoading(false);
      // 10초 후에 다시 호출할 수 있도록 설정
      setTimeout(() => {
        apiCalledRef.current = false;
      }, 10000);
    }
  }, [url, deviceId, isAPILoading, hasLoadedFromSession]);

  // 좋아요 처리 함수 메모이제이션 - 디바운스 적용
  const handleLikeDebounced = useMemo(
    () =>
      debounce(() => {
        if (isAPILoading || !url || !deviceId) return;

        const newLikedState = !liked;
        setLiked(newLikedState);
        setLikeCnt((prev: number) => prev + (newLikedState ? 1 : -1));

        // 로컬에 상태 즉시 저장
        setSessionStorage(`post_liked_${url}`, newLikedState);
        setSessionStorage(
          `post_like_${url}`,
          likeCnt + (newLikedState ? 1 : -1)
        );

        const likeType = newLikedState ? "like" : "unlike";

        setIsAPILoading(true);
        fetch(`/api/interact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            type: likeType,
            deviceId,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`API 응답 오류: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setLikeCnt(data.likeCnt || 0);
            setSessionStorage(`post_like_${url}`, data.likeCnt || 0);
          })
          .catch((error) => {
            console.error("좋아요 처리 실패:", error);
            // 오류 시 상태 복원
            setLiked(!newLikedState);
            setLikeCnt((prev: number) => prev + (newLikedState ? -1 : 1));
          })
          .finally(() => {
            setIsAPILoading(false);
          });
      }, 300),
    [url, deviceId, liked, isAPILoading, likeCnt]
  );

  // 외부로 노출할 좋아요 핸들러
  const handleLike = useCallback(() => {
    handleLikeDebounced();
  }, [handleLikeDebounced]);

  // 컴포넌트 마운트 시 최초 1회만 API 호출
  useEffect(() => {
    // 이미 세션 스토리지에 데이터가 있으면 API 호출 생략
    if (
      typeof window !== "undefined" &&
      !hasLoadedFromSession &&
      !apiCalledRef.current
    ) {
      // 페이지 로드 완료 후 API 호출
      setTimeout(() => {
        fetchInteractionData();
      }, 1000);
    }

    return () => {
      // 필요한 클린업 코드 (있을 경우)
    };
  }, [fetchInteractionData, hasLoadedFromSession]);

  return (
    <NormalLayout>
      <div className="flex justify-center mt-8 xl:mt-10 w-full mx-auto px-1">
        <div className="w-full xl:w-[800px] flex-col space-y-5">
          <PostTitleSet
            title={title}
            version={version}
            update_date={update_date}
            category_list={category_list}
            tags={tags}
            book={book}
            create_date={create_date}
            id={id}
            description={description}
            content={content}
            url={url}
            book_index={book_index}
            tableOfContents={tableOfContents}
          />
          <div className="w-full xl:w-[800px] flex-col">
            {/* Post content */}
            <MdxGenerator content={content} />
          </div>
          <div>
            <PostButtonSet
              likeCnt={likeCnt}
              liked={liked}
              handleLike={handleLike}
              content={data.churnotion}
            />
          </div>
          <hr className="border-t border-gray-light w-full mt-4" />
          <div className="flex flex-col justify-center items-center my-40 xl:w-[800px]">
            <Suspense
              fallback={
                <div className={"text-main-text-black dark:text-white-dark"}>
                  Loading book slider...
                </div>
              }
            >
              {book && <BookSlider book={book} currentBookIndex={book_index} />}
            </Suspense>
          </div>
          <div>
            <Suspense
              fallback={
                <div className={"text-main-text-black dark:text-white-dark"}>
                  Loading comments...
                </div>
              }
            >
              <CommentGiscus />
            </Suspense>
          </div>
        </div>
        <div className="hidden xl:block sticky top-20 h-[calc(100vh-40px)] overflow-auto w-[300px] ml-10">
          <div>
            <PostInteractions
              likeCnt={viewCnt > 0 ? likeCnt : initialLikeCnt}
              viewCnt={viewCnt > 0 ? viewCnt : initialViewCnt}
              liked={liked}
              handleLike={handleLike}
            />
          </div>
          <Suspense
            fallback={
              <div className={"text-main-text-black dark:text-white-dark"}>
                Loading table of contents...
              </div>
            }
          >
            <TableOfContents tableOfContents={tableOfContents} />
          </Suspense>
        </div>
      </div>
      {/** Scroll to top */}
      <ScrollToTop
        smooth
        className={
          "flex justify-center items-center z-50 xl:animate-bounce text-main-blue dark:text-sub-skyblue"
        }
        component={<UpSvg />}
      />
      <div className={"w-full xl:w-[1100px] mt-20"}>
        <Suspense
          fallback={
            <div className={"text-main-text-black dark:text-white-dark"}>
              Loading related posts...
            </div>
          }
        >
          <RelatedPost relatedPosts={relatedPosts} />
        </Suspense>
      </div>
    </NormalLayout>
  );
};

export const postQuery = graphql`
  query postQuery($pageId: String!) {
    churnotion(id: { eq: $pageId }) {
      id
      title
      update_date
      description
      create_date
      content
      category_list {
        category_name
        id
        url
      }
      tags {
        id
        color
        tag_name
        url
        slug
      }
      url
      version
      book {
        book_name
        id
        url
        book_image {
          childrenImageSharp {
            gatsbyImageData(
              quality: 100
              height: 100
              aspectRatio: 0.74
              layout: CONSTRAINED
            )
          }
        }
        book_category {
          category_name
        }
      }
      book_index
      tableOfContents {
        hash
        title
        type
        level
        parentHash
        contextTitle
      }
      thumbnail {
        childImageSharp {
          gatsbyImageData(
            sizes: "200"
            placeholder: BLURRED
            quality: 5
            height: 400
            width: 800
            layout: CONSTRAINED
          )
        }
      }
    }
    relatedPost(parent: { id: { eq: $pageId } }) {
      id
      posts {
        slug
        title
        update_date
        url
        version
        description
        create_date
        id
        category_list {
          id
          url
          category_name
        }
        tags {
          id
          slug
          tag_name
          url
          color
        }
        book {
          book_name
          id
          url
        }
        thumbnail {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              quality: 50
              width: 130
              height: 90
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`;

export default PostTemplate;

export const Head = ({ data }: PageProps<IPost, PostPageContext>) => {
  const { title, description, url, thumbnail } = data.churnotion;

  return (
    <SEO
      title={title}
      description={description}
      pathname={url}
      image={thumbnail?.childImageSharp.gatsbyImageData}
    />
  );
};
