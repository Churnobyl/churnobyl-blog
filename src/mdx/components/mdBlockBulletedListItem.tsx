import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import HoverLink from "../../components/hoverlink/hoverLink";
import { styling } from "./stylingClass";

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
        className={`flex mr-2 w-4 items-center justify-center leading-6 text-4xl font-thin text-main-text-black dark:text-white-dark`}
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

            const textClass = classNames(styling(annotations));

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
