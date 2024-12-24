import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import LinkSvg from "../common/linkSvg";

const MdBlockH3: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
  hash,
}) => {
  return (
    <div id={hash} className="relative group">
      <div
        className={`
      absolute left-0 top-0 -translate-x-7 translate-y-2 fill-gray-light 
      opacity-0 group-hover:opacity-100 
      transition-opacity duration-300
      hover:fill-highlight-red
    `}
      >
        <AnchorLink to={`#${hash}`}>
          <LinkSvg />
        </AnchorLink>
      </div>
      <h3 className={"text-xl font-bold mt-8 pb-2"}>
        {specialObject.rich_text[0].plain_text}
      </h3>
    </div>
  );
};

export default MdBlockH3;
