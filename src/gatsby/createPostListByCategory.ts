import { Page } from "gatsby";
import path from "path";
import { ISummarizedPost } from "../interfaces/ISummarizedPost";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { IBook, IBooks } from "../interfaces/IBook";

export const createPostListByCategory = async (
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
      allNCategory: {
        nodes: {
          id: string;
          category_name: string;
          url: string;
          version: number;
          childrenNCategory: {
            id: string;
            category_name: string;
          }[];
          childrenChurnotion: {
            id: string;
            title: string;
            description: string | null;
            create_date: string;
            update_date: string;
            url: string;
            slug: string;
            thumbnail: IGatsbyImageData;
            category_list: {
              category_name: string;
              id: string;
              url: string;
            }[];
            tags: {
              id: string;
              slug: string;
              tag_name: string;
              url: string;
              color: string;
            }[];
          }[];
          childrenNBook?: IBook[];
        }[];
      };
    }>(`
      query {
        allNCategory {
          nodes {
            id
            category_name
            url
            childrenNCategory {
              id
              category_name
            }
            childrenChurnotion {
              id
              title
              description
              create_date
              update_date
              slug
              url
              version
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
              category_list {
                category_name
                id
                url
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
            }
            childrenNBook {
              id
              book_name
              book_image {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    layout: CONSTRAINED
                    quality: 100
                    width: 130
                    aspectRatio: 0.74
                  )
                }
              }
              url
              update_date
              create_date
              description
            }
          }
        }
      }
    `);

    if (result.errors) {
      console.error("Error in createPostListByCategory:", result.errors);
      throw result.errors;
    }

    const categories = result.data?.allNCategory?.nodes || [];

    if (categories.length === 0) {
      console.warn("No categories found in createPostListByCategory");
      return;
    }

    const postsPerPage = 10;

    const collectPostsRecursively = (category: any): ISummarizedPost[] => {
      if (!category) {
        console.warn(
          "Received undefined or null category in collectPostsRecursively"
        );
        return [];
      }

      // childrenChurnotion이 없거나 undefined인 경우 빈 배열 반환
      const churnotions = category.childrenChurnotion || [];
      if (!Array.isArray(churnotions)) {
        console.warn(
          `Category ${
            category.category_name || "unknown"
          } has childrenChurnotion but it's not an array`
        );
        return [];
      }

      // ISummarizedPost 타입으로 명시적 변환
      const posts: ISummarizedPost[] = churnotions
        .filter((post: any) => post !== null && post !== undefined)
        .map(
          (post: any): ISummarizedPost => ({
            id: post.id || "",
            title: post.title || "",
            update_date: post.update_date || "",
            url: post.url || "",
            version: post.version || 0,
            description: post.description || "",
            create_date: post.create_date || "",
            category_list: post.category_list || [],
            tags: post.tags || [],
            thumbnail: post.thumbnail || null,
          })
        );

      // childrenNCategory가 없거나 undefined인 경우 건너뜀
      const childCategories = category.childrenNCategory || [];
      if (!Array.isArray(childCategories)) {
        return posts;
      }

      let allPosts: ISummarizedPost[] = [...posts];

      childCategories.forEach((subCategory: any) => {
        if (!subCategory || !subCategory.id) return;

        const subCategoryNode = categories.find(
          (cat) => cat && cat.id === subCategory.id
        );

        if (subCategoryNode) {
          const subCategoryPosts = collectPostsRecursively(subCategoryNode);
          if (Array.isArray(subCategoryPosts) && subCategoryPosts.length > 0) {
            allPosts = [...allPosts, ...subCategoryPosts];
          }
        }
      });

      return allPosts;
    };

    for (const category of categories) {
      try {
        if (!category || !category.id || !category.url) {
          console.warn("Invalid category found, skipping");
          continue;
        }

        const allPosts = collectPostsRecursively(category);
        const totalPosts = allPosts ? allPosts.length : 0;
        const totalBooks =
          category.childrenNBook && Array.isArray(category.childrenNBook)
            ? category.childrenNBook.length
            : 0;
        const numPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

        console.log(
          `Creating pages for category: ${category.category_name}, totalPosts: ${totalPosts}, numPages: ${numPages}`
        );

        Array.from({ length: numPages }).forEach((_, i) => {
          const pagePath =
            i === 0 ? `/${category.url}` : `/${category.url}/${i + 1}`;
          console.log(`Creating page at path: ${pagePath}`);

          createPage({
            path: pagePath,
            component: path.resolve(
              `./src/templates/post-list-by-category-page.tsx`
            ),
            context: {
              categoryId: category.id,
              categoryName: category.category_name || "",
              url: category.url,
              posts: allPosts.slice(i * postsPerPage, (i + 1) * postsPerPage),
              totalPosts,
              numPages,
              currentPage: i + 1,
              books: Array.isArray(category.childrenNBook)
                ? category.childrenNBook
                : [],
              totalBooks,
            },
          });
        });
      } catch (error) {
        console.error(
          `Error creating pages for category ${
            category.category_name || "unknown"
          }:`,
          error
        );
      }
    }
  } catch (generalError) {
    console.error("General error in createPostListByCategory:", generalError);
  }
};
