import { IGatsbyImageData } from "gatsby-plugin-image";
import { BaseContentBlock } from "notion-types";
import { IBook } from "./IBook";
import { ISummarizedPost } from "./ISummarizedPost";

interface File {
  childImageSharp?: {
    gatsbyImageData: IGatsbyImageData;
  };
}

export interface IPost extends ISummarizedPost {
  churnotion: IPostContent;
  relatedPost: {
    posts: IPostContent[];
  };
}

export interface IPostContent {
  id: string;
  title: string;
  update_date: string;
  description: string;
  create_date: string;
  content: BaseContentBlock[];
  category_list: {
    category_name: string;
    id: string;
    url: string;
  }[];
  tags: {
    id: string;
    color: string;
    tag_name: string;
    url: string;
    slug: string;
  }[];
  url: string;
  version: number;
  book: IBook;
  book_index: number;
  tableOfContents: {
    type: string;
    hash: string;
    title: string;
  }[];
  thumbnail?: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}
