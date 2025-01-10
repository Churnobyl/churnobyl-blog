import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link, type PageProps } from "gatsby";
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
}

const PostListByCategoryPage: React.FC<
  PageProps<{}, CategoryPostListPageContext>
> = ({ pageContext }) => {
  const { categoryName, posts, url, totalPosts, currentPage, numPages, books } =
    pageContext;

  return (
    <NormalLayout>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-baseline space-x-2">
          <span className="text-center text-3xl font-bold text-main-text-black dark:text-white-dark">
            {categoryName}
          </span>
          <span
            className={"text-main-blue dark:text-sub-skyblue text-xl font-bold"}
          >
            {totalPosts}
          </span>
        </div>
        <div
          id="content"
          className="mt-10 flex items-center justify-center flex-col w-full min-h-screen"
        >
          <div className="flex flex-col-reverse xl:flex-col xl:space-x-5 justify-between xl:w-[908px]">
            <SummarizedBookList data={books} />
          </div>
          <div className="flex flex-col-reverse xl:flex-col xl:space-x-5 justify-between xl:w-[908px]">
            <SummarizedPostList data={posts} />
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

export default PostListByCategoryPage;

export const Head = ({
  pageContext,
}: PageProps<{}, CategoryPostListPageContext>) => {
  const { categoryName, totalPosts, url, currentPage, numPages } = pageContext;
  const title = `${categoryName} (${totalPosts})`;
  return <SEO title={title} description={title} pathname={`/${url}`} />;
};
