import { BaseContentBlock } from "notion-types";
import { ISummarizedPost } from "./ISummarizedPost";

export interface IPost extends ISummarizedPost {
  churnotion: {
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
    book: {
      book_name: string;
    };
    book_index: number;
  };
}
