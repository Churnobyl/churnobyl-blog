import { IGatsbyImageData } from "gatsby-plugin-image";

export interface ISummarizedPost {
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
    slug?: string;
    tag_name: string;
    url: string;
    color: string;
  }[];
  thumbnail?: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  book_index?: number;
  index?: number;
  isShort?: boolean;
}

export interface ICategory {
  id: string;
  category_name: string;
  url: string;
}

export interface ITag {
  tag_name: string;
  id: string;
  url: string;
  color: string;
  slug?: string;
}
