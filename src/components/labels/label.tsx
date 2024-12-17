import classNames from "classnames";
import React from "react";

interface ILabel {
  text: "new" | "updated";
}

const Label: React.FC<ILabel> = ({ text }) => {
  const bgColor =
    text === "new" ? "bg-highlight-yellow" : "bg-sub-lightskyblue";
  const textColor = "text-black";
  const styles = ` ${bgColor} ${textColor}`;

  return (
    <span
      className={classNames(
        styles,
        `inline-flex justify-center drop-shadow-md items-center px-2 py-1 mx-2 rounded-lg font-bold leading-none text-xs`
      )}
    >
      {text === "new" ? "New" : "Updated"}
    </span>
  );
};

export default Label;
