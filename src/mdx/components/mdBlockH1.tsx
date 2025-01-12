import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import LinkSvg from "../common/linkSvg";
import useSmoothScroll from "../../hooks/use-smooth-scroll";

const MdBlockH1: React.FC<CustomBaseContentBlock> = ({
  hash,
  specialObject,
  parentId,
}) => {
  const { handleAnchorClick } = useSmoothScroll();

  return (
    <div
      id={hash}
      key={parentId}
      className="relative group flex flex-row items-center space-x-2 mt-16 pb-2 inset-0 border-b-2 border-b-main-text-black dark:border-b-white-dark border-opacity-70 dark:border-opacity-70 mb-6"
    >
      <h1
        className={
          "inline-block text-xl xl:text-2xl font-bold tracking-tight break-all text-main-text-black dark:text-white-dark"
        }
      >
        {specialObject.rich_text[0].plain_text}
      </h1>
      <div
        className={`inline-block
          xl:absolute xl:left-0 xl:top-0 xl:-translate-x-8 xl:translate-y-3 fill-main-text-black dark:fill-white-dark
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        `}
      >
        <a
          href={`#${hash}`}
          id={`hashlink-${hash}`}
          onClick={(e) => handleAnchorClick(e, hash)}
        >
          <LinkSvg />
        </a>
      </div>
    </div>
  );
};

export default MdBlockH1;
