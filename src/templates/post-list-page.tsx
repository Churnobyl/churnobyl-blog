import { PaginationItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { graphql, Link, type PageProps } from "gatsby";
import * as React from "react";
import NormalLayout from "../components/layout/normalLayout";
import BookList from "../components/main/bookList";
import SummarizedPostList from "../components/main/summarizedPostList";
import { IBlogListQueryData } from "../interfaces/IChurnotion";

interface BlogListPageContext {
  currentPage: number;
  numPages: number;
}

const PostListPage: React.FC<
  PageProps<IBlogListQueryData, BlogListPageContext>
> = ({ data, pageContext }) => {
  const posts = data.allChurnotion.edges.map((edge) => edge.node);
  const categoryForBooks = data.allNCategory.nodes;
  const { currentPage, numPages } = pageContext;

  return (
    <NormalLayout>
      <div className={"flex flex-col justify-center w-full"}>
        <div
          id={"content"}
          className={"mt-10 flex items-center justify-center w-full"}
        >
          <div className={"flex space-x-5 w-2/3 justify-between"}>
            <div className="flex flex-col w-2/3 justify-center col-span-2 px-4">
              <SummarizedPostList data={posts} />
            </div>
            <div className="flex col-span-1 w-1/3 px-4">
              <BookList data={categoryForBooks} />
            </div>
          </div>
        </div>
        <Pagination
          className={"flex items-center justify-center"}
          count={numPages}
          page={currentPage}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={item.page === 1 ? `/` : `/${item.page}/`}
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
                sizes: "200"
                placeholder: BLURRED
                quality: 10
                height: 250
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
