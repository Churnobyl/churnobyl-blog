import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link, graphql, type PageProps } from "gatsby";
import React from "react";
import SummarizedBookList from "../components/book/summarizedBookList";
import NormalLayout from "../components/layout/normalLayout";
import SummarizedPostList from "../components/main/summarizedPostList";
import { SEO } from "../components/seo/seo";
import { IBook } from "../interfaces/IBook";
import { ISummarizedPost } from "../interfaces/ISummarizedPost";

interface CategoryPostListPageContext {
  categoryId: string;
  categoryName: string;
  url: string;
  posts: ISummarizedPost[];
  totalPosts: number;
  currentPage: number;
  numPages: number;
  books: IBook[];
  totalBooks: number;
}

// Extended interface for the GraphQL query result
interface CategoryPageQueryData {
  allNCategory: {
    nodes: {
      id: string;
      category_name: string;
      url?: string;
      parent: {
        id: string;
      } | null;
      childrenNCategory: {
        id: string;
        category_name: string;
        url?: string;
        parent: {
          id: string;
        } | null;
        childrenChurnotion: {
          id: string;
        }[];
        childNCategory: {
          id: string;
          category_name: string;
          childrenChurnotion: {
            id: string;
          }[];
        }[];
      }[];
      childrenChurnotion?: {
        id: string;
      }[];
    }[];
  };
}

const PostListByCategoryPage: React.FC<
  PageProps<CategoryPageQueryData, CategoryPostListPageContext>
> = ({ data, pageContext }) => {
  const {
    categoryId,
    categoryName,
    posts,
    url,
    totalPosts,
    currentPage,
    numPages,
    books,
    totalBooks,
  } = pageContext;

  // 현재 카테고리 찾기
  const currentCategory = data?.allNCategory?.nodes.find(
    (cat) => cat.id === categoryId
  );

  // 현재 카테고리의 직계 하위 카테고리 찾기 (parent.id가 현재 카테고리 ID와 일치하는 것들)
  const directSubCategories =
    data?.allNCategory?.nodes.filter(
      (cat) => cat.parent && cat.parent.id === categoryId
    ) || [];

  // 하위 카테고리의 글 개수를 계산하는 함수
  const calculatePostCount = (categoryNode: any): number => {
    // 직접 연결된 문서 수
    const directPostCount = categoryNode.childrenChurnotion?.length || 0;

    // 하위 카테고리의 문서 수
    const subCatPostCount = (categoryNode.childrenNCategory || []).reduce(
      (sum: number, childCat: any) => {
        return sum + (childCat.childrenChurnotion?.length || 0);
      },
      0
    );

    return directPostCount + subCatPostCount;
  };

  // 변환된 하위 카테고리 데이터
  const categories = directSubCategories.map((subCat) => {
    const postCount = calculatePostCount(subCat);
    const hasSubCategories = (subCat.childrenNCategory?.length || 0) > 0;

    return {
      id: subCat.id,
      category_name: subCat.category_name,
      url: `/${subCat.url}`,
      parent: subCat.parent,
      postCount,
      hasSubCategories,
    };
  });

  return (
    <NormalLayout>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-baseline space-x-2">
          <span className="text-center text-3xl font-bold text-main-text-black dark:text-white-dark">
            {categoryName}
          </span>
        </div>

        <div
          id="content"
          className="mt-10 flex items-center justify-center flex-col w-full min-h-screen"
        >
          <div className="flex flex-col justify-between w-full xl:w-[720px]">
            <SummarizedBookList data={books} totalBooks={totalBooks} />
          </div>
          <div className="flex flex-col justify-between w-full xl:w-[720px]">
            <SummarizedPostList
              data={posts}
              totalPosts={totalPosts}
              categories={categories}
            />
          </div>
        </div>
        <Pagination
          className="flex items-center justify-center mb-10"
          count={numPages}
          page={currentPage}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={item.page === 1 ? `/${url}` : `/${url}/${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    </NormalLayout>
  );
};

// GraphQL query to fetch all categories for filtering
export const query = graphql`
  query CategoryPageQuery {
    allNCategory {
      nodes {
        id
        category_name
        url
        parent {
          id
        }
        childrenChurnotion {
          id
        }
        childrenNCategory {
          id
          category_name
          url
          parent {
            id
          }
          childrenChurnotion {
            id
          }
          childNCategory {
            id
            category_name
            childrenChurnotion {
              id
            }
          }
        }
      }
    }
  }
`;

export default PostListByCategoryPage;

export const Head = ({
  pageContext,
}: PageProps<{}, CategoryPostListPageContext>) => {
  const { categoryName, totalPosts, url, currentPage, numPages } = pageContext;
  const title = `${categoryName} (${totalPosts})`;
  return <SEO title={title} description={title} pathname={`/${url}`} />;
};
