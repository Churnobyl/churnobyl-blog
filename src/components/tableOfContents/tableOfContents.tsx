import React, { useEffect, useState } from "react";
import useSmoothScroll from "../../hooks/use-smooth-scroll"; // 커스텀 훅 사용

interface TOCItem {
  hash: string;
  title: string;
  type: string;
}

interface TableOfContentsProps {
  tableOfContents: TOCItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  tableOfContents,
}) => {
  const [activeHash, setActiveHash] = useState<string>("");
  const offset = 80;
  const { scrollToElement } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      let currentHash = "";

      tableOfContents.forEach((item) => {
        const element = document.getElementById(item.hash);
        if (element) {
          const elementTop =
            element.getBoundingClientRect().top + window.scrollY;
          if (window.scrollY >= elementTop - offset - 20) {
            currentHash = item.hash;
          }
        }
      });

      setActiveHash(currentHash);
    };

    window.addEventListener("scroll", handleScroll);

    // 초기 스크롤 상태 업데이트
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tableOfContents, offset]);

  return (
    <div>
      <ul className="space-y-2 mt-4">
        {tableOfContents.map((item, index) => {
          const textSize =
            item.type === "heading_1"
              ? "text-lg font-bold"
              : item.type === "heading_2"
              ? "text-md font-medium"
              : "text-base font-normal";

          const marginLeft =
            item.type === "heading_1"
              ? "ml-0"
              : item.type === "heading_2"
              ? "ml-4"
              : "ml-8";

          const isActive =
            activeHash === item.hash
              ? "border-l-main-blue text-main-blue border-l-4"
              : "border-l-2 border-l-gray-light text-gray-dark dark:text-white-dark";

          return (
            <li
              key={index}
              className={`${isActive} text-md tracking-tight leading-7 border-solid pl-4 ${textSize}`}
            >
              <div className={marginLeft}>
                <a
                  href={`#${item.hash}`}
                  className={``}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToElement(item.hash);
                  }}
                >
                  {item.title}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TableOfContents;
