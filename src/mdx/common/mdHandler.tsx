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
import MdBlockTable from "../components/mdBlockTable";
import MdBlockTableRow from "../components/mdBlockTableRow";
import MdBlockBookmark from "../components/mdBlockBookmark";
import MdBlockEquation from "../components/mdBlockEquation";
import MdBlockEmbed from "../components/mdBlockEmbed";
import MdBlockToDo from "../components/mdBlockToDo";
import MdBlockToggle from "../components/mdBlockToggle";

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
  table: MdBlockTable,
  table_row: MdBlockTableRow,
  bookmark: MdBlockBookmark,
  equation: MdBlockEquation,
  embed: MdBlockEmbed,
  to_do: MdBlockToDo,
  toggle: MdBlockToggle,
};

const MdHandler = ({
  data,
  children,
  level = 0,
  index = 0,
  showVersionDot = false, // 동그라미 표시 여부 파라미터 추가
  onMouseEnter, // 마우스 이벤트 핸들러 추가
  onMouseLeave,
  onClick,
}: {
  data: BaseContentBlock;
  children?: CustomBaseContentBlock[];
  level?: number;
  index?: number;
  showVersionDot?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const ComponentsToRender = blockMapper[data.type];
  const specialObject = (data as Record<string, any>)[data.type];

  if (!ComponentsToRender) {
    return <div>Unknown block type: {data.type}</div>;
  }

  return (
    <MdBlock id={data.id}>
      <ComponentsToRender
        children={children || []}
        specialObject={specialObject}
        index={index}
        level={level}
        parentId={data.id}
        showVersionDot={showVersionDot}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        {...data}
      />
    </MdBlock>
  );
};

export default MdHandler;
