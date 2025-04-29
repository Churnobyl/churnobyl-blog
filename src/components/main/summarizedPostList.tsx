import React from "react";
import SummarizedPost from "./summarizedPost";
import { ISummarizedPost } from "../../interfaces/ISummarizedPost";
import CategoryButtons from "../category/CategoryButtons";

type SummarizedPostListProps = {
  data: ISummarizedPost[];
  totalPosts: number;
  categories?: any[]; // Optional categories array
};

const SummarizedPostList: React.FC<SummarizedPostListProps> = ({
  data,
  totalPosts,
  categories = [], // Default to empty array
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
          {totalPosts > 0 && (
            <span className={"text-base text-main-blue dark:text-sub-skyblue"}>
              {totalPosts}
            </span>
          )}
        </div>

        {categories.length > 0 && (
          <div className="mt-4">
            <CategoryButtons categories={categories} />
          </div>
        )}
      </div>
      {data.map((post, index) => (
        <SummarizedPost key={post.id} {...post} index={index} />
      ))}
    </>
  );
};

export default SummarizedPostList;
