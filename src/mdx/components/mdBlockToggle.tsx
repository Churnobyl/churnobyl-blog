import React, { useState } from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import { styling } from "./stylingClass";
import MdHandler from "../common/mdHandler";

const MdBlockToggle: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
  children = [],
  level = 0,
  parentId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { rich_text, color } = specialObject || {};

  const textColor =
    color === "default"
      ? "text-main-text-black dark:text-white-dark"
      : `text-${color}`;

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`my-2 ${textColor}`}>
      <div
        className="flex items-start cursor-pointer group"
        onClick={toggleOpen}
      >
        <div
          className="mr-2 mt-1 text-gray-500 dark:text-gray-400 transition-transform duration-200 transform"
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 9L7.5 6L4.5 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1 text-md tracking-tighter leading-6">
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
                  onClick={(e) => e.stopPropagation()} // Prevent toggle when clicking link
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
      </div>

      {isOpen && children && children.length > 0 && (
        <div className="pl-6 mt-1">
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
  );
};

export default MdBlockToggle;
