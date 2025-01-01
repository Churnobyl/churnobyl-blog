import { Page } from "gatsby";
import path from "path";

interface ChurnotionNode {
  id: string;
  slug: string;
  url: string;
}

interface ChurnotionQueryResult {
  allChurnotion: {
    nodes: ChurnotionNode[];
  };
}

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
  const result = await graphql<ChurnotionQueryResult>(`
    query {
      allChurnotion {
        nodes {
          title
          slug
          id
          create_date
          content
          book {
            book_name
            update_date
            create_date
            url
          }
          url
          update_date
          version
          category_list {
            category_name
            id
            url
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data?.allChurnotion.nodes.forEach((node) => {
    createPage({
      path: node.url,
      component: path.resolve(`./src/templates/post-page.tsx`),
      context: { pageId: node.id },
    });
  });
};
