import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import MdHandler from "../common/mdHandler";
import HoverLink from "../../components/hoverlink/hoverLink";
import classNames from "classnames";

const toRoman = (num: number): string => {
  const romanNumerals: [string, number][] = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let result = "";
  for (const [roman, value] of romanNumerals) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result.toLowerCase();
};

const generateNumbering = (level: number, index: number): string => {
  if (level === 0) return `${index + 1}.`;
  if (level === 1) return `${String.fromCharCode(97 + index)}.`;
  if (level === 2) return `${toRoman(index + 1)}.`;
  return "";
};

const MdBlockNumberedListItem: React.FC<CustomBaseContentBlock> = ({
  children = [],
  specialObject,
  level = 0,
  index = 0,
}) => {
  const numbering = generateNumbering(level, index);

  return (
    <li className="flex items-start">
      <div
        className="flex items-center justify-center w-8 leading-none text-main-text-black dark:text-white-dark"
        style={{ lineHeight: "1.5" }}
      >
        {numbering}
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div
          className="notranslate break-words whitespace-pre-wrap caret-neutral-600 px-1 text-start"
          spellCheck="true"
          style={{ lineHeight: "1.5" }}
        >
          {specialObject.rich_text.map((text: any, idx: number) => {
            const { href, plain_text, annotations } = text;

            const textClass = classNames({
              "font-semibold": annotations.bold,
              italic: annotations.italic,
              "line-through": annotations.strikethrough,
              underline: annotations.underline,
              "text-highlight-red": annotations.bold || annotations.code,
              "dark:highlight-red-lighter": annotations.code,
              "text-main-text-black dark:text-white-dark": !(
                annotations.bold || annotations.code
              ),
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

        {children.length > 0 && (
          <ol className="list-none">
            {children.map((child, idx) => (
              <MdHandler
                key={child.id}
                data={child}
                children={child.children || []}
                level={level + 1}
                index={idx}
              />
            ))}
          </ol>
        )}
      </div>
    </li>
  );
};

export default MdBlockNumberedListItem;
