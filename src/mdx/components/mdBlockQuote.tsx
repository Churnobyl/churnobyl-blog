import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";

const MdBlockQuote: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
}) => {
  return (
    <blockquote className={"flex items-center mb-4"}>
      <div
        className={
          "text-md tracking-tight leading-7 border-l-4 border-solid pl-4 text-main-text-black dark:text-white-dark border-l-main-blue"
        }
      >
        {specialObject.rich_text[0].plain_text}
      </div>
    </blockquote>
  );
};

export default MdBlockQuote;
