import { PaginationItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { graphql, Link, type PageProps } from "gatsby";
import * as React from "react";
import NormalLayout from "../components/layout/normalLayout";
import SummarizedPostList from "../components/main/summarizedPostList";
import { SEO } from "../components/seo/seo";
import { IBlogListQueryData } from "../interfaces/IChurnotion";
import { CONST_URL } from "../constants";

interface BlogListPageContext {
  currentPage: number;
  numPages: number;
  totalPosts: number;
}

const PostListPage: React.FC<
  PageProps<IBlogListQueryData, BlogListPageContext>
> = ({ data, pageContext }) => {
  const posts = data.allChurnotion.edges.map((edge) => edge.node);
  const { currentPage, numPages, totalPosts } = pageContext;

  return (
    <NormalLayout>
      <div className={"flex flex-col justify-center w-full"}>
        <div
          id={"content"}
          className={"flex items-center justify-center w-full min-h-screen"}
        >
          <div className={"flex flex-col justify-between"}>
            <SummarizedPostList data={posts} totalPosts={totalPosts} />
          </div>
        </div>
        <Pagination
          className={
            "flex items-center justify-center mb-10 text-main-text-black dark:text-white-dark"
          }
          count={numPages}
          page={currentPage}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={
                item.page === 1
                  ? `${CONST_URL.HOME_URL}`
                  : `${CONST_URL.HOME_URL}${item.page}/`
              }
              {...item}
            />
          )}
        />
      </div>
    </NormalLayout>
  );
};

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allChurnotion(sort: { update_date: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
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
                quality: 100
                width: 130
                height: 90
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
    allNCategory(
      filter: { childrenNBook: { elemMatch: { book_name: { ne: "null" } } } }
    ) {
      nodes {
        id
        category_name
        childrenNBook {
          book_name
          url
          create_date
          update_date
          id
        }
      }
    }
  }
`;

export default PostListPage;

export const Head = ({
  pageContext,
}: PageProps<IBlogListQueryData, BlogListPageContext>) => {
  const { currentPage, numPages } = pageContext;
  const title = currentPage === 1 ? "Home" : `${currentPage}`;
  return (
    <SEO
      title={title}
      description={title}
      pathname={CONST_URL.HOME_URL + currentPage}
    />
  );
};
