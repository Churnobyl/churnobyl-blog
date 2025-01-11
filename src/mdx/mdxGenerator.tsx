import React, { useState, useCallback, useEffect } from "react";
import MdHandler from "./common/mdHandler";
import { BaseContentBlock } from "notion-types";
import { diffWords } from "diff";

interface IMdxGenerator {
  content: BaseContentBlock[];
}

interface IVersioning {
  date: string;
  title: string;
  description: string;
  oldContent: BaseContentBlock;
  currentContent: BaseContentBlock;
}

const isVersionHandler = (block: BaseContentBlock): boolean => {
  const richText = (block as Record<string, any>)[block.type]?.rich_text;
  return (
    richText &&
    richText.length > 0 &&
    richText[0].plain_text.startsWith("$version")
  );
};

const extractTextWithoutVersion = (block: BaseContentBlock): string => {
  const richText = (block as Record<string, any>)[block.type]?.rich_text;
  if (!richText) return "";

  return richText
    .map((rt: any) => rt.plain_text)
    .filter(
      (text: string) =>
        !text.includes("$version") && !text.includes("$versionEnd")
    )
    .join(" ");
};

const getRichTextWithoutVersion = (block: BaseContentBlock): any[] => {
  const richText = (block as Record<string, any>)[block.type]?.rich_text || [];
  return richText.filter(
    (rt: any) =>
      !rt.plain_text.includes("$version") &&
      !rt.plain_text.includes("$versionEnd")
  );
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

const MdxGenerator: React.FC<IMdxGenerator> = ({ content }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<IVersioning[] | null>(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1280);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const versioning: Record<string, IVersioning[]> = {};
  const components: React.ReactNode[] = [];

  let latestVersions: IVersioning[] = [];

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

  for (let i = 0; i < content.length; i++) {
    const block = content[i];

    if (isVersionHandler(block)) {
      const richText = (block as Record<string, any>)[block.type]?.rich_text;
      const versionText = richText[0].plain_text;
      const [, date, data] = versionText
        .split(",")
        .map((s: string) => s.trim());
      const [title, description] = data.split("$versionEnd");

      const newVersion: IVersioning = {
        date,
        title,
        description,
        oldContent: latestVersions.length
          ? latestVersions[latestVersions.length - 1].currentContent
          : block,
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

    components.push(
      <div key={block.id} className="relative">
        <MdHandler
          data={block}
          showVersionDot={!!versioning[block.id]}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
            handleMouseEnter(e, versioning[block.id])
          }
          onMouseLeave={handleMouseLeave}
          onClick={(e: React.MouseEvent<HTMLDivElement>) =>
            handleClick(e, versioning[block.id])
          }
        />
      </div>
    );
  }

  return (
    <>
      {components}
      {showModal && modalContent && (
        <div
          className={`fixed z-50 p-4 bg-white shadow-lg rounded-lg max-w-xl w-full ${
            isDesktop
              ? "absolute max-h-[400px]"
              : "h-1/2 bottom-0 left-1/2 transform -translate-x-1/2"
          } overflow-y-auto`}
          style={
            isDesktop ? { top: modalPosition.y, left: modalPosition.x } : {}
          }
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={handleCloseModal}
          >
            ✕
          </button>
          {modalContent.reverse().map((version, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-sm font-semibold">{version.date}</h3>
              <h4 className="text-xs font-semibold mt-1">{version.title}</h4>
              <p className="text-xs text-gray-500 mt-1">
                {version.description}
              </p>
              <div className="mt-2 text-xs">
                {getDiffElements(version.oldContent, version.currentContent)}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MdxGenerator;
