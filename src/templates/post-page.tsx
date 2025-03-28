import { graphql, PageProps } from "gatsby";
import React, { lazy, Suspense, useEffect, useState } from "react";
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
const CommentUtterances = lazy(
  () => import("../components/comments/commentUtterances")
);

interface PostPageContext {
  pageId: string;
}

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
  const [viewCnt, setViewCnt] = useState(0);
  const [likeCnt, setLikeCnt] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Fetch view and like status
    const recordViewAndLikeStatus = async () => {
      const deviceId = localStorage.getItem("device_id") || crypto.randomUUID();
      localStorage.setItem("device_id", deviceId);

      try {
        const response = await fetch(`/api/interact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, type: "view", deviceId }),
        });
        const data = await response.json();
        setViewCnt(data.viewCnt || 0);
        setLikeCnt(data.likeCnt || 0);
        setLiked(data.liked || false);
      } catch (error) {
        console.error("Failed to record view or fetch like status:", error);
      }
    };

    recordViewAndLikeStatus();
  }, [url]);

  const handleLike = () => {
    const deviceId = localStorage.getItem("device_id") || crypto.randomUUID();
    localStorage.setItem("device_id", deviceId);

    if (liked) {
      setLiked(false);
      setLikeCnt((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCnt((prev) => prev + 1);
    }
  };

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
              <CommentUtterances />
            </Suspense>
          </div>
        </div>
        <div className="hidden xl:block sticky top-20 h-[calc(100vh-40px)] overflow-auto w-[300px] ml-10">
          <div>
            <PostInteractions
              likeCnt={likeCnt}
              viewCnt={viewCnt}
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
        childrenChurnotion {
          title
          book_index
          thumbnail {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 200)
            }
          }
          id
          description
          url
        }
      }
      book_index
      tableOfContents
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
