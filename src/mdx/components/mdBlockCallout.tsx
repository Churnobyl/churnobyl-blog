import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import { styling } from "./stylingClass";

const MdBlockCallout: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
}) => {
  return (
    <div className="text-md mt-2 pb-2 tracking-tight leading-7 text-main-text-black dark:text-white-dark">
      {specialObject.rich_text.map((text: any, index: number) => {
        const { annotations, plain_text, href } = text;

        const textClass = classNames(styling(annotations));

        return href ? (
          <a
            key={index}
            href={href}
            className={`${textClass} text-blue-500 hover:underline`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {plain_text}
          </a>
        ) : (
          <span key={index} className={textClass}>
            {plain_text}
          </span>
        );
      })}
    </div>
  );
};

export default MdBlockCallout;
