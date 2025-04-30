import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import { styling } from "./stylingClass";
import MdHandler from "../common/mdHandler";

const MdBlockToDo: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
  children = [],
  level = 0,
  parentId,
}) => {
  const { rich_text, checked, color } = specialObject || {};

  const textColor =
    color === "default"
      ? "text-main-text-black dark:text-white-dark"
      : `text-${color}`;

  return (
    <div className={`flex group items-start my-1 ${textColor}`}>
      <div className="flex items-center h-6 mr-2">
        <input
          type="checkbox"
          checked={checked}
          readOnly
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-default"
        />
      </div>
      <div className="flex-1">
        <div
          className={`text-md tracking-tighter leading-6 ${
            checked ? "line-through text-gray-500 dark:text-gray-400" : ""
          }`}
        >
          {rich_text &&
            rich_text.map((text: any, index: number) => {
              const { annotations, plain_text, href } = text;
              const textClass = classNames(
                annotations ? styling(annotations) : ""
              );

              return href ? (
                <a
                  key={`${parentId}_${index}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${textClass} text-blue-600 dark:text-blue-400 hover:underline`}
                >
                  {plain_text}
                </a>
              ) : (
                <span key={`${parentId}_${index}`} className={textClass}>
                  {plain_text}
                </span>
              );
            })}
        </div>

        {children && children.length > 0 && (
          <div className="pl-4 mt-1">
            {children.map((child, index) => (
              <MdHandler
                key={child.id || index}
                data={child}
                level={level + 1}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MdBlockToDo;
