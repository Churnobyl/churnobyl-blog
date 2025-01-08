import React, { useEffect, useRef, useState } from "react";
import useSmoothScroll from "../../hooks/use-smooth-scroll";

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
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const offset = 80;
  const { scrollToElement } = useSmoothScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight - offset - 80 * 2;
      setContainerHeight(newHeight);
    };

    const handleScroll = () => {
      const scrollRatio =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);

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

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tableOfContents, offset]);

  useEffect(() => {
    if (activeHash && containerRef.current) {
      const activeElement = containerRef.current.querySelector(
        `[href="#${activeHash}"]`
      ) as HTMLAnchorElement;
      if (activeElement) {
        const container = containerRef.current;
        const elementTop = activeElement.offsetTop;
        const containerScrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const elementHeight = activeElement.clientHeight;

        const elementCenter = elementTop + elementHeight / 2;
        const containerCenter = containerScrollTop + containerHeight / 2;

        if (Math.abs(elementCenter - containerCenter) > elementHeight / 2) {
          container.scrollTo({
            top: elementTop - containerHeight / 2 + elementHeight / 2,
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeHash]);

  return (
    <div
      style={{ maxHeight: `${containerHeight}px` }}
      ref={containerRef}
      className="space-y-2 mt-4 overflow-hidden hover:overflow-y-auto scroll-smooth"
    >
      <ul className="space-y-2 mt-4 pr-8">
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
              ? "border-l-main-blue dark:border-l-sub-skyblue text-main-blue dark:text-sub-skyblue border-l-4"
              : "border-l-2 border-l-gray-light text-gray-dark dark:text-white-dark";

          return (
            <li
              key={index}
              className={`${isActive} text-md tracking-tight leading-7 border-solid pl-4 ${textSize} w-full`}
            >
              <div className={`${marginLeft} truncate`} title={item.title}>
                <a
                  href={`#${item.hash}`}
                  className={`break-all`}
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
