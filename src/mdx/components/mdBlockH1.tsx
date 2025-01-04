import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import LinkSvg from "../common/linkSvg";
import useSmoothScroll from "../../hooks/use-smooth-scroll";

const MdBlockH1: React.FC<CustomBaseContentBlock> = ({
  hash,
  specialObject,
}) => {
  const { handleAnchorClick } = useSmoothScroll();

  return (
    <div
      id={hash}
      className="relative group flex flex-row items-center space-x-2 mt-9 pb-2"
    >
      <h1
        className={"inline-block text-3xl font-bold tracking-tight break-all"}
      >
        {specialObject.rich_text[0].plain_text}
      </h1>
      <div
        className={`inline-block
          xl:absolute xl:left-0 xl:top-0 xl:-translate-x-8 xl:translate-y-3 fill-gray-light
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        `}
      >
        <a href={`#${hash}`} onClick={(e) => handleAnchorClick(e, hash)}>
          <LinkSvg color={"#24292e"} />
        </a>
      </div>
    </div>
  );
};

export default MdBlockH1;
