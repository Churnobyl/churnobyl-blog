import React from "react";
import { ISummarizedPost } from "../../interfaces/ISummarizedPost";
import SummarizedPost from "./summarizedPost";

interface IPostList {
  data: ISummarizedPost[];
}

const SummarizedPostList: React.FC<IPostList> = ({ data }) => {
  return (
    <div>
      <div className={"py-5"}>
        <h1 className={"text-xl font-bold"}>포스트</h1>
      </div>
      <div id={"post-list"}>
        {data.map((d) => (
          <SummarizedPost
            key={d.id}
            id={d.id}
            title={d.title}
            categories={d.categories}
            created_date={d.created_date}
            updated_date={d.updated_date}
            description={d.description}
            tags={d.tags}
            post_url={d.post_url}
          />
        ))}
      </div>
    </div>
  );
};

export default SummarizedPostList;
