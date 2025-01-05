import React from "react";

interface ILabel {
  text: "new" | "updated";
}

const Label: React.FC<ILabel> = ({ text }) => {
  return (
    <span
      className={`
        flex xl:inline-flex justify-center items-center text-xs ml-2 
        ${
          text === "new"
            ? "bg-gradient-to-r from-highlight-red to-highlight-yellow text-white shadow-lg"
            : "text-transparent bg-gradient-to-r from-main-blue to-sub-skyblue text-white shadow-lg"
        }
        rounded px-2 py-1
      `}
    >
      {text === "new" ? "✨" : "⬆️"}
    </span>
  );
};

export default Label;
