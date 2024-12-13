import { ISummarizedPost } from "./ISummarizedPost";

export interface IPost extends ISummarizedPost {
  content: string;
  story_number: number;
}
