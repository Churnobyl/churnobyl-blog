import React, { useEffect } from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import HoverLink from "../../components/hoverlink/hoverLink";

const MdBlockParagraph: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
}) => {
  return (
    <div className="text-md mt-2 pb-2 tracking-tight leading-7 break-all">
      {specialObject.rich_text.map((text: any, index: number) => {
        const { annotations, plain_text, href } = text;

        const textClass = classNames({
          "font-semibold": annotations.bold,
          italic: annotations.italic,
          "line-through": annotations.strikethrough,
          underline: annotations.underline,
          "text-highlight-red": annotations.code,
          "text-main-text-black": !(annotations.bold || annotations.code),
          "bg-gray-light": annotations.code,
          "rounded-lg": annotations.code,
          "py-1": annotations.code,
          "px-2": annotations.code,
          "text-[15px]": annotations.code,
          [`text-${annotations.color}`]:
            annotations.color !== "default" && !annotations.code,
        });

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
