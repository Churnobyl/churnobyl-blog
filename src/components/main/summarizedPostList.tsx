import React from "react";
import SummarizedPost from "./summarizedPost";
import { ISummarizedPost } from "../../interfaces/ISummarizedPost";

type SummarizedPostListProps = {
  data: ISummarizedPost[];
  totalPosts: number;
};

const SummarizedPostList: React.FC<SummarizedPostListProps> = ({
  data,
  totalPosts,
}) => {
  return (
    <>
      <div className={"py-4"}>
        <div
          className={
            "text-xl font-bold border-b-2 border-gray-light dark:border-white-dark text-main-text-black dark:text-white-dark"
          }
        >
          <span>포스트</span>{" "}
          {totalPosts && (
            <span className={"text-base text-main-blue dark:text-sub-skyblue"}>
              {totalPosts}
            </span>
          )}
        </div>
      </div>
      {data.map((post, index) => (
        <SummarizedPost key={post.id} {...post} index={index} />
      ))}
    </>
  );
};

export default SummarizedPostList;
