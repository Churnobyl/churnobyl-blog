import { Page } from "gatsby";
import path from "path";
import { IBook } from "../interfaces/IBook";

export const createBookPage = async (
  graphql: <TData, TVariables = any>(
    query: string,
    variables?: TVariables
  ) => Promise<{ errors?: any; data?: TData }>,
  createPage: <TContext = Record<string, unknown>>(
    this: void,
    args: Page<TContext>
  ) => void
) => {
  const result = await graphql<{ allNBook: { nodes: IBook[] } }>(`
    query {
      allNBook {
        nodes {
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
          slug
          description
          book_category {
            category_name
            id
            url
          }
          childrenChurnotion {
            id
            title
            description
            create_date
            update_date
            slug
            url
            book_index
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
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const books = result.data?.allNBook.nodes;
  if (!books) return;

  books.forEach((book) => {
    const sortedPosts = book.childrenChurnotion?.sort(
      (a: { book_index: number }, b: { book_index: number }) =>
        a.book_index - b.book_index
    );

    const bookTagList = Array.from(
      new Set(
        book.childrenChurnotion?.flatMap((post) =>
          post.tags?.map((tag) => tag.id)
        )
      )
    ).map(
      (id) =>
        book.childrenChurnotion
          ?.flatMap((post) => post.tags)
          .find((tag) => tag?.id === id)!
    );

    createPage({
      path: book.url,
      component: path.resolve(`./src/templates/book-page.tsx`),
      context: {
        bookId: book.id,
        description: book.description,
        bookName: book.book_name,
        bookImage: book.book_image,
        bookCategory: book.book_category,
        createDate: book.create_date,
        updateDate: book.update_date,
        url: book.url,
        posts: sortedPosts,
        bookTagList,
      },
    });
  });
};
