import React, { useEffect } from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import HoverLink from "../../components/hoverlink/hoverLink";
import { styling } from "./stylingClass";

const MdBlockParagraph: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
}) => {
  return (
    <div className="text-md mt-2 pb-2 tracking-tighter text-main-text-black leading-7 dark:text-white-dark">
      {specialObject.rich_text.map((text: any, index: number) => {
        const { annotations, plain_text, href } = text;

        const textClass = classNames(styling(annotations));

        return href ? (
          <HoverLink key={text} href={href}>
            {plain_text}
          </HoverLink>
        ) : (
          <span key={index} className={`${textClass}`}>
            {plain_text}
          </span>
        );
      })}
    </div>
  );
};

export default MdBlockParagraph;
