import React from "react";
import { ISummarizedPost, ITag } from "../../interfaces/ISummarizedPost";
import Tag from "./tag";

interface TagListProps {
  tags: ITag[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex overflow-x-auto whitespace-nowrap">
      {tags.map((tag) => (
        <Tag {...tag} key={tag.id} />
      ))}
    </div>
  );
};

export default TagList;
