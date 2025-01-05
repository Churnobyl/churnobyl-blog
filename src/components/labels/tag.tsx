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
        className={
          classNames(`mr-3 text-main-blue`)
          // `inline-block rounded-md mr-3 py-1 px-2 text-xs space-x-1 hover:bg-opacity-70`,
          // bgClass
        }
      >
        <span className={classNames(`text-opacity-30 text-sm`)}>#</span>
        <span className={classNames("font-bold text-sm")}>{tag_name}</span>
      </div>
    </Link>
  );
};

export default Tag;
