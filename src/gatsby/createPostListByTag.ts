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
  try {
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
        allNTag(
          limit: 1000
          sort: { childrenChurnotion: { update_date: DESC } }
        ) {
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
      console.error("Error in createPostListByTag:", result.errors);
      throw result.errors;
    }

    const tags = result?.data?.allNTag?.edges || [];

    if (tags.length === 0) {
      console.warn("No tags found in createPostListByTag");
      return;
    }

    const postsPerPage = 10;

    for (const { node } of tags) {
      try {
        if (!node || !node.id || !node.url) {
          console.warn("Invalid tag found, skipping");
          continue;
        }

        // childrenChurnotion 필드 안전하게 처리
        const childrenChurnotion = node.childrenChurnotion || [];
        if (!Array.isArray(childrenChurnotion)) {
          console.warn(
            `Tag ${
              node.tag_name || "unknown"
            } has childrenChurnotion but it's not an array`
          );
          continue;
        }

        const numPages = Math.max(
          1,
          Math.ceil(childrenChurnotion.length / postsPerPage)
        );
        const totalPosts = childrenChurnotion.length;

        console.log(
          `Creating pages for tag: ${node.tag_name}, totalPosts: ${totalPosts}, numPages: ${numPages}`
        );

        Array.from({ length: numPages }).forEach((_, i) => {
          const pagePath = i === 0 ? `/${node.url}` : `/${node.url}/${i + 1}`;
          console.log(`Creating page at path: ${pagePath}`);

          createPage({
            path: pagePath,
            component: path.resolve(
              `./src/templates/post-list-by-tag-page.tsx`
            ),
            context: {
              tagId: node.id,
              tagName: node.tag_name || "",
              tagUrl: node.url,
              totalPosts,
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          });
        });
      } catch (error) {
        console.error(
          `Error creating pages for tag ${node.tag_name || "unknown"}:`,
          error
        );
      }
    }
  } catch (generalError) {
    console.error("General error in createPostListByTag:", generalError);
  }
};
