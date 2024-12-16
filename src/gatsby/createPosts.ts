import { Page } from "gatsby";
import path from "path";

export const createPosts = async (
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
  const result = await graphql(`
    query {
      allChurnotion {
        nodes {
          id
          content
          title
          slug
          category_list {
            slug
          }
          url
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data.allChurnotion.nodes.forEach((node) => {
    const { id, content, title, slug, category_list, url } = node;

    createPage({
      path: url,
      component: path.resolve(`./src/templates/post-page.tsx`),
      context: { id, content, title, slug, category_list },
    });
  });
};
