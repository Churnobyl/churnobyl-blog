import React, { useState, useEffect } from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import classNames from "classnames";
import { styling } from "./stylingClass";
import HoverLink from "../../components/hoverlink/hoverLink";

const MdBlockTable: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
  children = [],
}) => {
  // 다크모드 감지
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // 초기 다크모드 상태 확인
    const checkDarkMode = () => {
      if (typeof window !== "undefined") {
        const isDark = document.documentElement.classList.contains("dark");
        setIsDarkMode(isDark);
      }
    };

    // 다크모드 변경 감지
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          checkDarkMode();
        }
      });
    });

    checkDarkMode();

    if (typeof window !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Table has attributes like table_width, has_column_header, has_row_header
  const { table_width, has_column_header, has_row_header } =
    specialObject?.table || specialObject || {};

  // 자식 요소가 없는 경우 테이블 데이터에서 행 가져오기
  const rows =
    children.length > 0 ? children : specialObject?.table?.rows || [];

  // CSS inline style을 사용해 우선순위 높이기
  const headerBgStyle = {
    "--tw-bg-opacity": "1",
    backgroundColor: "rgb(230 235 255 / var(--tw-bg-opacity))",
  };

  const headerBgStyleDark = {
    backgroundColor: "rgb(30 58 138 / var(--tw-bg-opacity))",
  };

  // 현재 모드에 맞는 스타일 선택
  const currentHeaderStyle = isDarkMode ? headerBgStyleDark : headerBgStyle;

  return (
    <div className="my-8 flex justify-center">
      <div className="overflow-x-auto w-full md:w-auto rounded-md">
        <div className="inline-block border border-gray-200 dark:border-white-dark rounded-md overflow-hidden bg-white dark:bg-main-text-black">
          <table className="border-collapse text-sm">
            {has_column_header && rows.length > 0 && (
              <thead>
                <tr className="border-b border-gray-200 dark:border-white-dark !bg-gray-50 dark:!bg-gray-800">
                  {(() => {
                    const firstRow = rows[0];
                    const rowData = firstRow.specialObject || firstRow;
                    const tableRowData = rowData.table_row || rowData;
                    const cells = tableRowData.cells || [];

                    return cells.map((cell: any[], cellIndex: number) => {
                      return (
                        <th
                          key={`header_${cellIndex}`}
                          className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white-dark border-r border-gray-200 dark:border-white-dark last:border-r-0"
                          style={currentHeaderStyle}
                        >
                          {cell && cell.length > 0 ? (
                            <>
                              {cell.map((text: any, textIndex: number) => {
                                if (!text) return null;
                                const { annotations, plain_text, href } = text;
                                const textClass = classNames(
                                  annotations ? styling(annotations) : "",
                                  "font-medium"
                                );
                                return href ? (
                                  <HoverLink
                                    key={`header_text_${cellIndex}_${textIndex}`}
                                    href={href}
                                  >
                                    {plain_text}
                                  </HoverLink>
                                ) : (
                                  <span
                                    key={`header_text_${cellIndex}_${textIndex}`}
                                    className={textClass}
                                  >
                                    {plain_text}
                                  </span>
                                );
                              })}
                            </>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-400">
                              -
                            </span>
                          )}
                        </th>
                      );
                    });
                  })()}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row: any, rowIndex: number) => {
                // 헤더 행이면 건너뛰기
                if (has_column_header && rowIndex === 0) return null;

                // row.specialObject 또는 row.table_row에서 cells 찾기
                const rowData = row.specialObject || row;
                const tableRowData = rowData.table_row || rowData;
                const cells = tableRowData.cells || [];

                return (
                  <tr
                    key={row.id || `row_${rowIndex}`}
                    className="border-b border-gray-200 dark:border-white-dark last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    {cells.map((cell: any[], cellIndex: number) => {
                      // 첫 번째 열에 행 헤더 스타일 적용 (has_row_header가 true일 때)
                      const isFirstColumn = cellIndex === 0 && has_row_header;
                      const cellClass = isFirstColumn
                        ? "px-4 py-3 font-medium text-gray-900 dark:text-white-dark border-r border-gray-200 dark:border-white-dark last:border-r-0 !bg-gray-50 dark:!bg-gray-800"
                        : "px-4 py-3 text-gray-600 dark:text-white-dark border-r border-gray-200 dark:border-white-dark last:border-r-0";

                      return (
                        <td
                          key={`cell_${rowIndex}_${cellIndex}`}
                          className={cellClass}
                          style={isFirstColumn ? currentHeaderStyle : undefined}
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
                                    key={`text_${rowIndex}_${cellIndex}_${textIndex}`}
                                    href={href}
                                  >
                                    {plain_text}
                                  </HoverLink>
                                ) : (
                                  <span
                                    key={`text_${rowIndex}_${cellIndex}_${textIndex}`}
                                    className={textClass}
                                  >
                                    {plain_text}
                                  </span>
                                );
                              })}
                            </>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-400">
                              -
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MdBlockTable;
