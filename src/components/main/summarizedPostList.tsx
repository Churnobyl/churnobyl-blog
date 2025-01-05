import React from "react";
import SummarizedPost from "./summarizedPost";
import { ISummarizedPost } from "../../interfaces/ISummarizedPost";

type SummarizedPostListProps = {
  data: ISummarizedPost[];
};

const SummarizedPostList: React.FC<SummarizedPostListProps> = ({ data }) => {
  return (
    <div>
      <div className={"py-10"}>
        <h1 className={"text-xl font-bold"}>포스트</h1>
      </div>
      {data.map((post) => (
        <SummarizedPost key={post.id} {...post} />
      ))}
    </div>
  );
};

export default SummarizedPostList;
