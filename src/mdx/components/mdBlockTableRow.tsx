import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import { styling } from "./stylingClass";
import HoverLink from "../../components/hoverlink/hoverLink";

const MdBlockTableRow: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
  parentId,
  index = 0,
}) => {
  // 디버깅 로그 추가
  console.log("MdBlockTableRow 렌더링:", {
    type,
    specialObject,
    parentId,
    index,
  });

  // specialObject에서 table_row 객체와 cells 배열을 추출
  // table_row 객체가 없으면 specialObject에서 직접 cells를 찾음
  const tableRow = specialObject?.table_row || {};
  const cells = tableRow.cells || specialObject?.cells || [];

  console.log("테이블 행 cells 데이터:", cells);

  if (!cells || !Array.isArray(cells)) {
    console.log("테이블 행에 유효한 cells가 없음");
    return null;
  }

  return (
    <>
      {cells.map((cell: any[], cellIndex: number) => (
        <td
          key={`${parentId || index}_${cellIndex}`}
          className="px-4 py-3 text-gray-600 dark:text-white-dark border-r border-gray-200 dark:border-white-dark last:border-r-0"
        >
          {cell && cell.length > 0 ? (
            <>
              {cell.map((text: any, textIndex: number) => {
                if (!text) return null;

                const { annotations, plain_text, href } = text;
                const textClass = classNames(
                  annotations ? styling(annotations) : ""
                );

                return href ? (
                  <HoverLink
                    key={`${parentId || index}_${cellIndex}_${textIndex}`}
                    href={href}
                  >
                    <span className="text-blue-600 dark:text-blue-400 hover:underline">
                      {plain_text}
                    </span>
                  </HoverLink>
                ) : (
                  <span
                    key={`${parentId || index}_${cellIndex}_${textIndex}`}
                    className={textClass}
                  >
                    {plain_text}
                  </span>
                );
              })}
            </>
          ) : (
            <span className="text-gray-400 dark:text-gray-400">-</span>
          )}
        </td>
      ))}
    </>
  );
};

export default MdBlockTableRow;
