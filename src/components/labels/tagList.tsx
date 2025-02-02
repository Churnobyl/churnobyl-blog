import React from "react";
import { ISummarizedPost, ITag } from "../../interfaces/ISummarizedPost";
import Tag from "./tag";
import classNames from "classnames";

interface TagListProps {
  tags: ITag[];
  isHorizontal: boolean;
  isShowAll?: boolean;
}

const TagList: React.FC<TagListProps> = ({
  tags,
  isHorizontal,
  isShowAll = false,
}) => {
  return (
    <div
      className={classNames("flex gap-2 mr-2 items-center", {
        "overflow-x-auto scrollbar-hide max-w-72 flex-wrap xs:flex-nowrap":
          isHorizontal,
        "overflow-hidden flex-wrap max-h-32": !isHorizontal,
      })}
    >
      {tags.slice(0, isShowAll ? tags.length : 3).map((tag) => (
        <Tag {...tag} key={tag.id} />
      ))}
    </div>
  );
};

export default TagList;
