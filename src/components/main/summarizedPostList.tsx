import React from "react";
import SummarizedPost from "./summarizedPost";
import { ISummarizedPost } from "../../interfaces/ISummarizedPost";

type SummarizedPostListProps = {
  data: ISummarizedPost[];
};

const SummarizedPostList: React.FC<SummarizedPostListProps> = ({ data }) => {
  return (
    <div>
      <div className={"py-4"}>
        <h1
          className={
            "text-xl font-bold border-b-2 border-gray-light dark:border-white-dark text-main-text-black dark:text-white-dark"
          }
        >
          포스트
        </h1>
      </div>
      {data.map((post) => (
        <SummarizedPost key={post.id} {...post} />
      ))}
    </div>
  );
};

export default SummarizedPostList;
