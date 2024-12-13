import React from "react";
import NormalLayout from "../../components/layout/normalLayout";
import { IPost } from "../../interfaces/IPost";
import { sample_post } from "../../api";

const PostTemplate: React.FC<IPost> = ({
  id,
  categories,
  content,
  created_date,
  description,
  post_url,
  story_number,
  tags,
  title,
  updated_date,
}) => {
  return (
    <NormalLayout>
      <main>
        <div
          id={"content"}
          className={"my-10 flex items-center justify-center w-full"}
        >
          <div className={"flex justify-between w-2/3"}>
            <div id={"content_head"}>
              <div>{title}</div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </main>
    </NormalLayout>
  );
};

export default PostTemplate;
