import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";

const MdBlockDivider: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
}) => {
  return (
    <div className={"inline-flex items-center justify-center w-full"}>
      <hr
        className={
          "w-1/2 h-1 my-8 border-2 rounded-xl border-main-text-black dark:border-white-dark"
        }
      />
      <div
        className={
          "absolute px-4 -translate-x-1/5 bg-white dark:bg-main-text-black left-1/5"
        }
      >
        <svg
          className={"w-4 h-4 text-main-text-black dark:text-white-dark"}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 14"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 1H0V13H5L8 16L11 13H16V1ZM3 6H5V8H3V6ZM9 6H7V8H9V6ZM13 6H11V8H13V6Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default MdBlockDivider;
