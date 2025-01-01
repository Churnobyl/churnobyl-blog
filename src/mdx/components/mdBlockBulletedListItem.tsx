import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import HoverLink from "../../components/hoverlink/hoverLink";

const MdBlockBulletedListItem: React.FC<CustomBaseContentBlock> = ({
  type,
  has_children,
  children = [],
  specialObject,
  level = 0,
}) => {
  return (
    <li className={`flex items-start`}>
      <div
        className={`flex mr-2 w-4 items-center justify-center leading-7 text-4xl font-thin text-main-text-black`}
      >
        {level === 0 ? "•" : level === 1 ? "◦" : "▪"}
      </div>

      <div
        style={{
          flex: "1 1 0px",
          minWidth: "1px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="notranslate"
          spellCheck="true"
          style={{
            maxWidth: "100%",
            width: "100%",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            caretColor: "rgb(55, 53, 47)",
            padding: "3px 2px",
            textAlign: "start",
          }}
        >
          {specialObject.rich_text.map((text: any, index: number) => {
            const { annotations, plain_text, href } = text;

            const textClass = classNames({
              "font-semibold": annotations.bold,
              italic: annotations.italic,
              "line-through": annotations.strikethrough,
              underline: annotations.underline,
              "text-highlight-red": annotations.bold || annotations.code,
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
              <HoverLink key={index} href={href}>
                {plain_text}
              </HoverLink>
            ) : (
              <span key={index} className={`${textClass}`}>
                {plain_text}
              </span>
            );
          })}
        </div>

        {has_children && (
          <ul className="list-disc">
            {children.map((child, index) => {
              const special = child?.bulleted_list_item || {};

              if (Object.keys(special).length === 0) return;

              return (
                <MdBlockBulletedListItem
                  key={index}
                  {...child}
                  specialObject={special}
                  level={level + 1}
                />
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
};

export default MdBlockBulletedListItem;
