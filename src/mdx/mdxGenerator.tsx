import React, { useState, useCallback, useEffect } from "react";
import MdHandler from "./common/mdHandler";
import { BaseContentBlock } from "notion-types";
import { diffWords } from "diff";
import { uniqueId } from "lodash";
import {
  CustomBaseContentBlock,
  CustomTableBlock,
  CustomTableRowBlock,
} from "../interfaces/IBlock";

interface IMdxGenerator {
  content: BaseContentBlock[];
}

interface IVersioning {
  id: string;
  date: string;
  title: string;
  description: string;
  oldContent: BaseContentBlock;
  currentContent: BaseContentBlock;
}

interface ModalProps {
  showModal: boolean;
  modalContent: IVersioning[] | null;
  modalPosition: { x: number; y: number };
  isDesktop: boolean;
  onClose: () => void;
  getDiffElements: (
    oldBlock: BaseContentBlock,
    newBlock: BaseContentBlock
  ) => React.ReactNode;
}

const VersionModal: React.FC<ModalProps> = React.memo(
  ({
    showModal,
    modalContent,
    modalPosition,
    isDesktop,
    onClose,
    getDiffElements,
  }) => {
    if (!modalContent) return null;

    return (
      <div
        className={`fixed z-[100] p-4 bg-white shadow-lg rounded-lg max-w-lg w-full ${
          isDesktop
            ? "absolute max-h-[400px]"
            : "h-1/2 bottom-0 left-1/2 transform -translate-x-1/2"
        } overflow-y-auto transition-opacity duration-200 ${
          showModal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={isDesktop ? { top: modalPosition.y, left: modalPosition.x } : {}}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        {modalContent.reverse().map((version) => (
          <div key={version.id} className="mt-4">
            <h3 className="text-sm font-semibold">{version.date}</h3>
            <h4 className="text-xs font-semibold mt-1">{version.title}</h4>
            <p className="text-xs text-gray-500 mt-1">{version.description}</p>
            <div className="mt-2 text-xs">
              {getDiffElements(version.oldContent, version.currentContent)}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

const isVersionHandler = (block: BaseContentBlock): boolean => {
  const richText = (block as Record<string, any>)[block.type]?.rich_text;
  return (
    richText &&
    richText.length > 0 &&
    richText[0].plain_text.startsWith("$version")
  );
};

const getRichTextWithoutVersion = (block: BaseContentBlock): any[] => {
  const richText = (block as Record<string, any>)[block.type]?.rich_text || [];
  return richText.map((rt: any) => ({
    ...rt,
    plain_text: rt.plain_text.replace(/\$version, .*?\$versionEnd\s*/, ""),
  }));
};

const getDiffElements = (
  oldBlock: BaseContentBlock,
  newBlock: BaseContentBlock
) => {
  const oldRichText = getRichTextWithoutVersion(oldBlock);
  const newRichText = getRichTextWithoutVersion(newBlock);

  const styledBlocks: React.ReactNode[] = [];

  for (let i = 0; i < Math.max(oldRichText.length, newRichText.length); i++) {
    const oldText = oldRichText[i]?.plain_text || "";
    const newText = newRichText[i]?.plain_text || "";

    const differences = diffWords(oldText, newText);

    differences.forEach((part, index) => {
      const style = part.added
        ? { backgroundColor: "lightgreen" }
        : part.removed
        ? { backgroundColor: "lightcoral" }
        : {};

      if (part.value.trim()) {
        styledBlocks.push(
          <span key={`diff-${i}-${index}`} style={style}>
            {part.value}
          </span>
        );
      }
    });
  }

  return <div>{styledBlocks}</div>;
};

// 블록에 자식 요소가 있는지 확인하는 함수
const hasChildren = (
  block: BaseContentBlock | CustomBaseContentBlock
): boolean => {
  return !!(block as CustomBaseContentBlock).has_children;
};

// 테이블 블록인지 확인
const isTableBlock = (
  block: BaseContentBlock | CustomBaseContentBlock
): block is CustomTableBlock => {
  return block.type === "table";
};

// 테이블 행 블록인지 확인
const isTableRowBlock = (
  block: BaseContentBlock | CustomBaseContentBlock
): block is CustomTableRowBlock => {
  return block.type === "table_row";
};

const MdxGenerator: React.FC<IMdxGenerator> = ({ content }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<IVersioning[] | null>(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  let numbering = 0;

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1280);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const versioning: Record<string, IVersioning[]> = {};
  const seenIds = new Set();

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, versions: IVersioning[]) => {
      if (isDesktop) {
        setModalContent(versions);
        setShowModal(true);
        setModalPosition({
          x: e.clientX + window.scrollX,
          y: e.clientY + window.scrollY,
        });
      }
    },
    [isDesktop]
  );

  const handleMouseLeave = useCallback(() => {
    if (isDesktop) {
      setShowModal(false);
    }
  }, [isDesktop]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, versions: IVersioning[]) => {
      if (!isDesktop) {
        setModalContent(versions);
        setShowModal(true);
      }
    },
    [isDesktop]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // 재귀적으로 블록과 자식 블록을 처리하는 함수
  const processBlocks = (
    blocks: (BaseContentBlock | CustomBaseContentBlock)[],
    level = 0
  ): React.ReactNode[] => {
    let latestVersions: IVersioning[] = [];
    const components: React.ReactNode[] = [];
    let blockNumbering = 0;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (seenIds.has(block.id)) continue;
      seenIds.add(block.id);

      // 버전 관리 블록 처리
      if (isVersionHandler(block)) {
        const richText = (block as Record<string, any>)[block.type]?.rich_text;
        const versionText = richText[0].plain_text;

        const [, date, data] = versionText
          .split(",")
          .map((s: string) => s.trim());
        const [title, description] = data.split("$versionEnd");

        if (latestVersions.length > 0) {
          latestVersions[latestVersions.length - 1].currentContent = block;
        }

        const newVersion: IVersioning = {
          id: block.id || uniqueId("version-"),
          date,
          title,
          description,
          oldContent: block,
          currentContent: block,
        };

        latestVersions.push(newVersion);
        continue;
      }

      if (latestVersions.length > 0) {
        latestVersions[latestVersions.length - 1].currentContent = block;
        versioning[block.id] = latestVersions;
        latestVersions = [];
      }

      // 테이블 블록 처리: table_row 타입의 자식이 있는 테이블 블록 전용 처리
      if (isTableBlock(block)) {
        // 테이블의 자식 블록 처리 (table_row)
        let tableRows: React.ReactNode[] = [];

        // children 배열이 존재하는 경우
        if (block.children && Array.isArray(block.children)) {
          // children에서 테이블 행 찾기
          tableRows = processBlocks(
            block.children as (BaseContentBlock | CustomBaseContentBlock)[],
            level + 1
          );
        }

        // 테이블 블록 컴포넌트 추가
        components.push(
          <MdHandler
            key={`${block.id}-${i}`}
            data={block as BaseContentBlock}
            children={tableRows.length > 0 ? (tableRows as any) : undefined}
            showVersionDot={!!versioning[block.id]}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
              handleMouseEnter(e, versioning[block.id])
            }
            onMouseLeave={handleMouseLeave}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              handleClick(e, versioning[block.id])
            }
            index={blockNumbering}
            level={level}
          />
        );
      }
      // 테이블 행은 부모 테이블 블록에서 처리함
      else if (isTableRowBlock(block)) {
        components.push(
          <MdHandler
            key={`${block.id}-${i}`}
            data={block as BaseContentBlock}
            children={undefined}
            showVersionDot={!!versioning[block.id]}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
              handleMouseEnter(e, versioning[block.id])
            }
            onMouseLeave={handleMouseLeave}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              handleClick(e, versioning[block.id])
            }
            index={blockNumbering}
            level={level}
          />
        );
      }
      // 일반 블록 처리
      else {
        // 자식 블록 처리
        let childBlocks: React.ReactNode[] = [];
        if (hasChildren(block) && (block as CustomBaseContentBlock).children) {
          childBlocks = processBlocks(
            (block as CustomBaseContentBlock).children as (
              | BaseContentBlock
              | CustomBaseContentBlock
            )[],
            level + 1
          );
        }

        // 일반 블록 컴포넌트 추가
        components.push(
          <MdHandler
            key={`${block.id}-${i}`}
            data={block as BaseContentBlock}
            children={childBlocks.length > 0 ? (childBlocks as any) : undefined}
            showVersionDot={!!versioning[block.id]}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
              handleMouseEnter(e, versioning[block.id])
            }
            onMouseLeave={handleMouseLeave}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              handleClick(e, versioning[block.id])
            }
            index={blockNumbering}
            level={level}
          />
        );
      }

      if (block.type === "numbered_list_item") {
        blockNumbering += 1;
      } else {
        blockNumbering = 0;
      }
    }

    return components;
  };

  // 모든 블록 처리
  const renderedComponents = processBlocks(content);

  return (
    <>
      {renderedComponents}
      <VersionModal
        showModal={showModal}
        modalContent={modalContent}
        modalPosition={modalPosition}
        isDesktop={isDesktop}
        onClose={handleCloseModal}
        getDiffElements={getDiffElements}
      />
    </>
  );
};

export default MdxGenerator;
