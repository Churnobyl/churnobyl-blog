import React from "react";
import { Link, type PageProps } from "gatsby";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import NormalLayout from "../components/layout/normalLayout";
import { SEO } from "../components/seo/seo";
import { CONST_URL } from "../constants";
import SummarizedPostList from "../components/main/summarizedPostList";
import { IGatsbyImageData } from "gatsby-plugin-image";

interface CategoryPostListPageContext {
  categoryId: string;
  categoryName: string;
  url: string;
  posts: {
    slug: string;
    title: string;
    update_date: string;
    url: string;
    version: number | null;
    description: string | null;
    create_date: string;
    id: string;
    category_list: {
      id: string;
      url: string;
      category_name: string;
    }[];
    tags: {
      id: string;
      slug?: string;
      tag_name: string;
      url: string;
      color: string;
    }[];
    thumbnail: IGatsbyImageData;
  }[];
  totalPosts: number;
  currentPage: number;
  numPages: number;
}

const PostListByCategoryPage: React.FC<
  PageProps<{}, CategoryPostListPageContext>
> = ({ pageContext }) => {
  const { categoryName, posts, url, totalPosts, currentPage, numPages } =
    pageContext;

  return (
    <NormalLayout>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-baseline space-x-2 mt-10">
          <span className="text-center text-3xl font-bold text-main-text-black dark:text-white-dark">
            {categoryName}
          </span>
          <span className={"text-main-blue text-xl font-bold"}>
            {totalPosts}
          </span>
        </div>
        <div
          id="content"
          className="mt-10 flex items-center justify-center w-full min-h-screen"
        >
          <div className="flex flex-col-reverse xl:flex-col space-x-5 justify-between">
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
  const title =
    currentPage === 1
      ? `${categoryName} Posts (${totalPosts})`
      : `${categoryName} Posts (${totalPosts}) - Page ${currentPage} of ${numPages}`;
  return <SEO title={title} description={title} pathname={`/${url}`} />;
};
