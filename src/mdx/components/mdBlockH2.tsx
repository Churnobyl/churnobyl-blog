import { AnchorLink } from "gatsby-plugin-anchor-links";
import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import LinkSvg from "../common/linkSvg";
import useSmoothScroll from "../../hooks/use-smooth-scroll";

const MdBlockH2: React.FC<CustomBaseContentBlock> = ({
  specialObject,
  hash,
}) => {
  const { handleAnchorClick } = useSmoothScroll();

  return (
    <div id={hash} className="relative group">
      <div
        className={`
          absolute left-0 top-0 -translate-x-7 translate-y-3 fill-gray-light 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300
          hover:fill-highlight-red
        `}
      >
        <a href={`#${hash}`} onClick={(e) => handleAnchorClick(e, hash)}>
          <LinkSvg />
        </a>
      </div>
      <h2 className="text-2xl font-bold mt-9 pb-2 tracking-tight">
        {specialObject.rich_text[0].plain_text}
      </h2>
    </div>
  );
};

export default MdBlockH2;
