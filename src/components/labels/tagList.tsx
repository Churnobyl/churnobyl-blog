import React from "react";
import { ISummarizedPost, ITag } from "../../interfaces/ISummarizedPost";
import Tag from "./tag";

interface TagListProps {
  tags: ITag[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2 mr-2 items-center justify-center">
      {tags.map((tag) => (
        <Tag {...tag} key={tag.id} />
      ))}
    </div>
  );
};

export default TagList;
