import { IGatsbyImageData } from "gatsby-plugin-image";

export type IBlogListQueryData = {
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
        thumbnail: IGatsbyImageData;
      };
    }[];
  };
  allNCategory: {
    nodes: {
      id: string;
      category_name: string;
      childrenNBook: {
        book_name: string;
        url: string;
        create_date: string;
        update_date: string;
        id: string;
      }[];
    }[];
  };
};
