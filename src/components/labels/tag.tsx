import { Link } from "gatsby";
import React from "react";
import { ITag } from "../../interfaces/ISummarizedPost";

const Tag: React.FC<ITag> = ({ tag_name, id }) => {
  return (
    <Link to={`/tag/${tag_name}`}>
      <div
        id={id}
        className={
          "inline-block bg-main-blue rounded-md mr-3 py-1 px-2 text-base space-x-1"
        }
      >
        <span className={"text-gray-light"}>#</span>
        <span className={"text-white font-bold text-sm"}>{tag_name}</span>
      </div>
    </Link>
  );
};

export default Tag;
