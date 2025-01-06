import { Page } from "gatsby";
import path from "path";

export const createPostListByTag = async (
  graphql: <TData, TVariables = any>(
    query: string,
    variables?: TVariables
  ) => Promise<{
    errors?: any;
    data?: TData;
  }>,
  createPage: <TContext = Record<string, unknown>>(
    this: void,
    args: Page<TContext>
  ) => void
) => {
  const result = await graphql<{
    allNTag: {
      edges: {
        node: {
          id: string;
          tag_name: string;
          url: string;
          childrenChurnotion: { id: string; title: string }[];
        };
      }[];
    };
  }>(`
    query {
      allNTag(limit: 1000, sort: { childrenChurnotion: { update_date: DESC } }) {
        edges {
          node {
            id
            tag_name
            url
            childrenChurnotion {
              id
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const tags = result?.data?.allNTag.edges;

  if (!tags) return;

  const postsPerPage = 10;

  tags.forEach(({ node }) => {
    const numPages = Math.ceil(node.childrenChurnotion.length / postsPerPage);
    const totalPosts = node.childrenChurnotion.length;
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `${node.url}` : `${node.url}/${i + 1}`,
        component: path.resolve(`./src/templates/post-list-by-tag-page.tsx`),
        context: {
          tagId: node.id,
          tagName: node.tag_name,
          tagUrl: node.url,
          totalPosts,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });
};
