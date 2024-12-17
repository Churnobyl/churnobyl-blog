import { Link } from "gatsby";
import React from "react";
import { ITag } from "../../interfaces/ISummarizedPost";
import classNames from "classnames";

const Tag: React.FC<ITag> = ({ tag_name, id, url, color }) => {
  const bgClass = `bg-tag-${color}`;
  const textClass = `text-tag-text-${color}`;

  return (
    <Link to={`/${url}`}>
      <div
        id={id}
        className={classNames(
          `inline-block rounded-md mr-3 py-1 px-2 text-xs space-x-1`,
          bgClass
        )}
      >
        <span className={classNames(`text-opacity-30 text-sm`, textClass)}>
          #
        </span>
        <span className={classNames("font-bold text-xs", textClass)}>
          {tag_name}
        </span>
      </div>
    </Link>
  );
};

export default Tag;
