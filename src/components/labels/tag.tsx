import { Link } from "gatsby";
import React from "react";
import { ITag } from "../../interfaces/ISummarizedPost";
import classNames from "classnames";

const Tag: React.FC<ITag> = ({ tag_name, id, url, color }) => {
  // const bgClass = `bg-tag-${color}`;
  // const textClass = `text-tag-text-${color}`;

  return (
    <Link to={`/${url}`}>
      <div
        id={id}
        className={classNames(
          ` text-main-blue dark:text-sub-skyblue text-xs md:text-sm flex flex-row`
        )}
      >
        <div className={classNames(`text-opacity-30`)}>#</div>
        <div className={classNames("font-bold whitespace-nowrap")}>
          {tag_name}
        </div>
      </div>
    </Link>
  );
};

export default Tag;
