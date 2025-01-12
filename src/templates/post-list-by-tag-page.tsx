import React from "react";
import { graphql, Link, type PageProps } from "gatsby";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import NormalLayout from "../components/layout/normalLayout";
import SummarizedPostList from "../components/main/summarizedPostList";
import { SEO } from "../components/seo/seo";
import { IBlogListQueryData } from "../interfaces/IChurnotion";
import { CONST_URL } from "../constants";

interface TagPostListPageContext {
  tagId: string;
  tagName: string;
  tagUrl: string;
  totalPosts: number;
  currentPage: number;
  numPages: number;
}

const TagPostListPage: React.FC<
  PageProps<IBlogListQueryData, TagPostListPageContext>
> = ({ data, pageContext }) => {
  const posts = data.allChurnotion.edges.map((edge) => edge.node);
  const { tagName, tagUrl, currentPage, numPages, totalPosts } = pageContext;

  return (
    <NormalLayout>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-baseline space-x-2">
          <span className="text-center text-3xl font-bold text-main-text-black dark:text-white-dark">
            #{tagName}
          </span>
        </div>
        <div
          id="content"
          className="flex items-center justify-center w-full min-h-screen"
        >
          <div className="flex flex-col justify-between">
            <SummarizedPostList data={posts} totalPosts={totalPosts} />
          </div>
        </div>
        <Pagination
          className="flex items-center justify-center mb-10"
          count={numPages}
          page={currentPage}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={item.page === 1 ? `/${tagUrl}` : `/${tagUrl}/${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    </NormalLayout>
  );
};

export const blogListQuery = graphql`
  query blogListQueryByTag($tagId: String!, $skip: Int!, $limit: Int!) {
    allChurnotion(
      filter: { tags: { elemMatch: { id: { eq: $tagId } } } }
      sort: { update_date: DESC }
      limit: $limit
      skip: $skip
    ) {
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
  }
`;

export default TagPostListPage;

export const Head = ({
  pageContext,
}: PageProps<IBlogListQueryData, TagPostListPageContext>) => {
  const { tagName, tagUrl, totalPosts, currentPage, numPages } = pageContext;
  const title = `${tagName} (${totalPosts})`;
  return <SEO title={title} description={title} pathname={"/" + tagUrl} />;
};
