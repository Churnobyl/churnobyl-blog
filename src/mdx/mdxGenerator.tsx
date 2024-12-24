import React from "react";
import MdHandler from "./common/mdHandler";
import { NOTION_TYPE_FOR_VERSIONING } from "./constants";
import { BaseContentBlock } from "notion-types";

interface IMdxGenerator {
  content: BaseContentBlock[];
}

const isNumberedList = (block: BaseContentBlock) =>
  block.type === "numbered_list_item";

const isVersionHandler = (component: BaseContentBlock) => {
  return component.type === NOTION_TYPE_FOR_VERSIONING;
};

const MdxGenerator: React.FC<IMdxGenerator> = ({ content }) => {
  const components: React.ReactNode[] = [];
  let numberedListIndex = 0;

  for (let i = 0; i < content.length; i++) {
    const block = content[i];

    const isVersioning = isVersionHandler(block);

    if (isVersioning) {
      // const rawText =
      //   block?.content?.NOTION_TYPE_FOR_VERSIONING?.rich_text?.[0]?.plain_text;

      // if (rawText && rawText.startsWith("version")) {
      // }

      continue;
    }

    if (isNumberedList(block)) {
      numberedListIndex++;
      components.push(
        <MdHandler key={block.id} data={block} index={numberedListIndex - 1} />
      );
    } else {
      numberedListIndex = 0;
      components.push(<MdHandler key={block.id} data={block} />);
    }
  }

  return <>{components}</>;
};

export default MdxGenerator;
