import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import { styling } from "./stylingClass";

const MdBlockEmbed: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
}) => {
  const { url, caption } = specialObject || {};

  // Skip rendering if no URL is provided
  if (!url) return null;

  return (
    <div className="my-6">
      <div className="w-full overflow-hidden rounded border border-gray-200 dark:border-gray-700">
        <div className="relative pb-[56.25%] h-0">
          <iframe
            src={url}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded content"
            loading="lazy"
          />
        </div>
      </div>

      {caption && caption.length > 0 && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
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
  );
};

export default MdBlockEmbed;
