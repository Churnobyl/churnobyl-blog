import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import { styling } from "./stylingClass";

const MdBlockBookmark: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
}) => {
  const { url, caption } = specialObject || {};

  return (
    <div className="my-4">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="p-4">
          <div className="flex items-center">
            <div className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500 dark:text-gray-400"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </div>
            <div className="flex-1 truncate">
              <div className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-1 truncate">
                {url}
              </div>
            </div>
          </div>

          {caption && caption.length > 0 && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {caption.map((text: any, index: number) => {
                const { annotations, plain_text } = text;
                const textClass = classNames(
                  annotations ? styling(annotations) : ""
                );

                return (
                  <span key={index} className={textClass}>
                    {plain_text}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default MdBlockBookmark;
