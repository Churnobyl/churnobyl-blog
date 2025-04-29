import { PaginationItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { graphql, Link, type PageProps } from "gatsby";
import * as React from "react";
import NormalLayout from "../components/layout/normalLayout";
import SummarizedPostList from "../components/main/summarizedPostList";
import { SEO } from "../components/seo/seo";
import { CONST_URL } from "../constants";

// Extended interface to match our updated GraphQL query
interface ExtendedBlogListQueryData {
  allChurnotion: {
    edges: {
      node: {
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
          slug: string;
          tag_name: string;
          url: string;
          color: string;
        }[];
        book: {
          book_name: string;
          id: string;
          url: string;
        };
        thumbnail?: {
          childImageSharp: {
            gatsbyImageData: any; // Using 'any' for brevity
          };
        };
      };
    }[];
  };
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
      // 각 카테고리에 직접 연결된 문서
      childrenChurnotion?: {
        id: string;
      }[];
    }[];
  };
}

interface BlogListPageContext {
  currentPage: number;
  numPages: number;
  totalPosts: number;
}

const PostListPage: React.FC<
  PageProps<ExtendedBlogListQueryData, BlogListPageContext>
> = ({ data, pageContext }) => {
  const posts = data.allChurnotion.edges.map((edge) => edge.node);
  const { currentPage, numPages, totalPosts } = pageContext;

  // 최상위 카테고리만 필터링 (parent가 null인 카테고리)
  const topLevelCategories = data.allNCategory.nodes.filter(
    (cat) => cat.parent === null
  );

  // 카테고리와 모든 하위 카테고리의 글 개수를 계산하는 함수
  const calculateTotalPostCount = (categoryNode: any): number => {
    // 1. 직접 연결된 문서 수
    const directPostCount = categoryNode.childrenChurnotion?.length || 0;

    // 2. 직계 하위 카테고리의 문서 수
    const childrenPostCount = (categoryNode.childrenNCategory || []).reduce(
      (sum: number, childCat: any) => {
        return sum + (childCat.childrenChurnotion?.length || 0);
      },
      0
    );

    // 3. 하위 카테고리의 하위 카테고리 문서 수 (재귀적으로 계산)
    const grandChildrenPostCount = (
      categoryNode.childrenNCategory || []
    ).reduce((sum: number, childCat: any) => {
      return (
        sum +
        (childCat.childrenNCategory || []).reduce(
          (subSum: number, grandChild: any) => {
            return subSum + (grandChild.childrenChurnotion?.length || 0);
          },
          0
        )
      );
    }, 0);

    // 총합 반환
    return directPostCount + childrenPostCount + grandChildrenPostCount;
  };

  // 카테고리 데이터 변환
  const categories = topLevelCategories.map((node) => {
    const postCount = calculateTotalPostCount(node);
    const hasSubCategories = (node.childrenNCategory?.length || 0) > 0;

    return {
      id: node.id,
      category_name: node.category_name,
      url: node.url || `/blog/category/${node.category_name.toLowerCase()}`,
      parent: node.parent,
      postCount,
      hasSubCategories,
    };
  });

  return (
    <NormalLayout>
      <div className={"flex flex-col justify-center w-full"}>
        <div
          id={"content"}
          className={"flex items-center justify-center min-h-screen"}
        >
          <div className={"flex flex-col w-full xl:w-[720px] justify-between"}>
            <SummarizedPostList
              data={posts}
              totalPosts={totalPosts}
              categories={categories}
            />
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

export default PostListPage;

export const Head = ({
  pageContext,
}: PageProps<ExtendedBlogListQueryData, BlogListPageContext>) => {
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
