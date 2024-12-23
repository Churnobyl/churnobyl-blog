import { BaseContentBlock } from "notion-types";
import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import MdBlockDivider from "../components/mdBlockDivider";
import MdBlockH1 from "../components/mdBlockH1";
import MdBlockH2 from "../components/mdBlockH2";
import MdBlockH3 from "../components/mdBlockH3";
import MdBlockImage from "../components/mdBlockImage";
import MdBlockParagraph from "../components/mdBlockParagraph";
import MdBlock from "./mdBlock";
import MdBlockQuote from "../components/mdBlockQuote";
import MdBlockCode from "../components/mdBlockCode";
import MdBlockBulletedListItem from "../components/mdBlockBulletedListItem";
import MdBlockNumberedListItem from "../components/mdBlockNumberedListItem";
import MdBlockCallout from "../components/mdBlockCallout";

const blockMapper: Record<string, React.FC<CustomBaseContentBlock>> = {
  heading_1: MdBlockH1,
  heading_2: MdBlockH2,
  heading_3: MdBlockH3,
  paragraph: MdBlockParagraph,
  image: MdBlockImage,
  divider: MdBlockDivider,
  quote: MdBlockQuote,
  code: MdBlockCode,
  bulleted_list_item: MdBlockBulletedListItem,
  numbered_list_item: MdBlockNumberedListItem,
  callout: MdBlockCallout,
};

const MdHandler = ({
  data,
  children,
  level = 0,
  index = 0,
}: {
  data: BaseContentBlock;
  children?: CustomBaseContentBlock[];
  level?: number;
  index?: number;
}) => {
  const ComponentsToRender = blockMapper[data.type];
  const specialObject = (data as Record<string, any>)[data.type];

  if (!ComponentsToRender) {
    return <div>Unknown block type: {data.type}</div>;
  }

  return (
    <MdBlock id={data.id} key={data.id}>
      <ComponentsToRender
        children={children || []}
        specialObject={specialObject}
        index={index}
        level={level}
        {...data}
      />
    </MdBlock>
  );
};

export default MdHandler;
