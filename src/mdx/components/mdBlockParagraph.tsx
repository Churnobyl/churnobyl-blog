import React, { useEffect } from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import HoverLink from "../../components/hoverlink/hoverLink";
import { styling } from "./stylingClass";

const MdBlockParagraph: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
  parentId,
  showVersionDot,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <div className="text-md my-2 pb-2 tracking-tighter text-main-text-black leading-7 dark:text-white-dark">
      {specialObject.rich_text.map((text: any, index: number) => {
        const { annotations, plain_text, href } = text;

        const textClass = classNames(styling(annotations));

        return href ? (
          <HoverLink key={parentId + "_" + index} href={href}>
            {plain_text}
          </HoverLink>
        ) : (
          <span key={parentId + "_" + index} className={`${textClass}`}>
            {plain_text}
          </span>
        );
      })}
      {showVersionDot && (
        <span
          className={
            "text-xs text-main-blue dark:text-sub-skyblue inline ml-1 hover:animate-pulse"
          }
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          style={{ cursor: "pointer", color: "blue" }}
        >
          ●
        </span>
      )}
    </div>
  );
};

export default MdBlockParagraph;
