import { IPostContent } from "./IPost";

export interface IPostInteractions {
  viewCnt?: number;
  likeCnt?: number;
  liked: boolean;
  handleLike: () => void;
  content?: IPostContent;
}
