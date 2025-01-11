import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { IPostContent } from "../../interfaces/IPost";
import SummarizedPost from "../main/summarizedPost";

interface RelatedPostProps {
  relatedPosts: IPostContent[];
}

const RelatedPost: React.FC<RelatedPostProps> = ({ relatedPosts }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-main-text-black dark:text-white-dark">
        관련 포스트
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-10">
        {relatedPosts.map((post, index) => (
          <SummarizedPost key={post.id} {...post} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPost;
