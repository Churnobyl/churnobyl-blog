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
  const insetShadow =
    text === "new"
      ? `inset 0px -2px 2px rgb(197, 187, 0)`
      : `inset 0px -2px 2px rgb(163, 208, 214)`;

  return (
    <span
      className={classNames(
        styles,
        `inline-flex justify-center items-center px-2 py-1 mx-2 rounded-lg font-bold leading-none text-xs`
      )}
      style={{
        boxShadow: insetShadow,
      }}
    >
      {text === "new" ? "New" : "Updated"}
    </span>
  );
};

export default Label;
