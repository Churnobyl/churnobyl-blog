import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import LinkSvg from "../common/linkSvg";
import useSmoothScroll from "../../hooks/use-smooth-scroll";

const MdBlockH3: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
  hash,
}) => {
  const { handleAnchorClick } = useSmoothScroll();

  return (
    <div
      id={hash}
      className="relative group flex flex-row items-center space-x-2 mt-8 pb-2"
    >
      <h3
        className={
          "inline-block text-lg xl:text-xl font-bold tracking-tight break-all text-main-text-black dark:text-white-dark"
        }
      >
        {specialObject.rich_text[0].plain_text}
      </h3>
      <div
        className={`inline-block
          xl:absolute xl:left-0 xl:top-0 xl:-translate-x-8 xl:translate-y-1.5 fill-main-text-black dark:fill-white-dark
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
    `}
      >
        <a href={`#${hash}`} onClick={(e) => handleAnchorClick(e, hash)}>
          <LinkSvg />
        </a>
      </div>
    </div>
  );
};

export default MdBlockH3;
