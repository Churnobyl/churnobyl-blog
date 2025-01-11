import { Page } from "gatsby";
import path from "path";
import { ISummarizedPost } from "../interfaces/ISummarizedPost";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { IBooks } from "../interfaces/IBook";

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
        childrenNBook?: IBooks;
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
                  quality: 50
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
    throw result.errors;
  }

  const categories = result.data?.allNCategory.nodes;

  if (!categories) return;

  const postsPerPage = 10;

  const collectPostsRecursively = (category: any): ISummarizedPost[] => {
    let posts = category.childrenChurnotion.map((post: ISummarizedPost) => ({
      slug: post.id,
      title: post.title,
      update_date: post.update_date,
      url: post.url,
      version: post.version,
      description: post.description,
      create_date: post.create_date,
      id: post.id,
      category_list: post.category_list,
      tags: post.tags,
      thumbnail: post.thumbnail,
    }));

    category.childrenNCategory.forEach((subCategory: any) => {
      const subCategoryNode = categories.find(
        (cat) => cat.id === subCategory.id
      );
      if (subCategoryNode) {
        posts = posts.concat(collectPostsRecursively(subCategoryNode));
      }
    });

    return posts;
  };

  categories.forEach((category) => {
    const allPosts = collectPostsRecursively(category);
    const totalPosts = allPosts.length;
    const numPages = Math.ceil(totalPosts / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `${category.url}` : `${category.url}/${i + 1}`,
        component: path.resolve(
          `./src/templates/post-list-by-category-page.tsx`
        ),
        context: {
          categoryId: category.id,
          categoryName: category.category_name,
          url: category.url,
          posts: allPosts.slice(i * postsPerPage, (i + 1) * postsPerPage),
          totalPosts,
          numPages,
          currentPage: i + 1,
          books: category.childrenNBook,
        },
      });
    });
  });
};
