import { AnchorLink } from "gatsby-plugin-anchor-links";
import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import LinkSvg from "../common/linkSvg";

const MdBlockH2: React.FC<CustomBaseContentBlock> = ({
  specialObject,
  hash,
}) => {
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
        <AnchorLink to={`#${hash}`}>
          <LinkSvg />
        </AnchorLink>
      </div>
      <h2 className="text-3xl font-bold mt-9 pb-2 tracking-tight">
        {specialObject.rich_text[0].plain_text}
      </h2>
    </div>
  );
};

export default MdBlockH2;
