import React from "react";
import { ISummarizedPost, ITag } from "../../interfaces/ISummarizedPost";
import Tag from "./tag";

interface TagListProps {
  tags: ITag[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <>
      {tags.map((tag) => (
        <Tag {...tag} key={tag.id} />
      ))}
    </>
  );
};

export default TagList;
