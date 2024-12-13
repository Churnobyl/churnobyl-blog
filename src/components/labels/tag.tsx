import { Link } from "gatsby";
import React from "react";

interface ITag {
  tag_name: string;
  id: number;
}

const Tag: React.FC<ITag> = ({ tag_name, id }) => {
  return (
    <Link to={`/tag/${tag_name}`}>
      <div
        id={String(id)}
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
