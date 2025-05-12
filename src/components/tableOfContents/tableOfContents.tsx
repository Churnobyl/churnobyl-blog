import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import useSmoothScroll from "../../hooks/use-smooth-scroll";

interface TOCItem {
  hash: string;
  title: string;
  type: string;
  level: number;
  parentHash: string;
  contextTitle: string | null;
}

interface TableOfContentsProps {
  tableOfContents: TOCItem[] | any[]; // Allowing any[] for backward compatibility
}

// Interface for hierarchical TOC structure
interface HierarchicalTOCItem extends TOCItem {
  children: HierarchicalTOCItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  tableOfContents,
}) => {
  const [activeHash, setActiveHash] = useState<string>("");
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const offset = 80;
  const { scrollToElement } = useSmoothScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollListenerRef = useRef<number | null>(null);
  const isScrollingRef = useRef<boolean>(false);

  // Deduplicate and map missing properties for backward compatibility
  const processedTOCItems = useMemo(() => {
    if (!tableOfContents) return [];

    // Use a Set to track seen hashes
    const seen = new Set<string>();
    const result: TOCItem[] = [];

    for (const item of tableOfContents) {
      // Create a unique key based on hash and title
      const key = `${item.hash}:${item.title}`;

      // Only add if we haven't seen this item before
      if (!seen.has(key)) {
        seen.add(key);

        // Add missing properties for backward compatibility
        const processedItem: TOCItem = {
          hash: item.hash,
          title: item.title,
          type: item.type || "",
          level:
            item.level ||
            (item.type === "heading_1" ? 1 : item.type === "heading_2" ? 2 : 3),
          parentHash: item.parentHash || "",
          contextTitle: item.contextTitle || null,
        };

        result.push(processedItem);
      }
    }

    return result;
  }, [tableOfContents]);

  // Build hierarchical structure while preserving original order
  const hierarchicalData = useMemo(() => {
    // Create a map of items by hash for quick lookups
    const hashMap: Record<string, HierarchicalTOCItem> = {};

    // Initialize all items with empty children arrays
    processedTOCItems.forEach((item) => {
      hashMap[item.hash] = { ...item, children: [] };
    });

    // Create a separate array for root items (to preserve order)
    const rootItems: HierarchicalTOCItem[] = [];
    const childItems: HierarchicalTOCItem[] = [];

    // First identify root and child items
    processedTOCItems.forEach((item) => {
      const hiItem = hashMap[item.hash];
      if (!item.parentHash || !hashMap[item.parentHash]) {
        // This is a root item
        rootItems.push(hiItem);
      } else {
        // This is a child item
        childItems.push(hiItem);
      }
    });

    // Then add children to their parents (in original order)
    childItems.forEach((childItem) => {
      if (childItem.parentHash && hashMap[childItem.parentHash]) {
        hashMap[childItem.parentHash].children.push(childItem);
      }
    });

    return rootItems;
  }, [processedTOCItems]);

  // Debounce function to prevent too many updates
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };

  // Initialize container height
  const handleResize = useCallback(() => {
    const newHeight = window.innerHeight - offset - 80 * 2;
    setContainerHeight(newHeight);
  }, [offset]);

  // Handle scroll event with debouncing
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current) return;

    // Find the active heading
    let currentHash = "";
    const headings = processedTOCItems;

    for (let i = headings.length - 1; i >= 0; i--) {
      const item = headings[i];
      const element = document.getElementById(item.hash);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= offset + 20) {
          currentHash = item.hash;
          break;
        }
      }
    }

    if (currentHash !== activeHash) {
      setActiveHash(currentHash);
    }
  }, [processedTOCItems, activeHash, offset]);

  // Debounced scroll handler
  const debouncedHandleScroll = useCallback(debounce(handleScroll, 100), [
    handleScroll,
  ]);

  // Set up event listeners for resize and scroll
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", debouncedHandleScroll);

    handleResize();
    debouncedHandleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", debouncedHandleScroll);
      if (scrollListenerRef.current) {
        cancelAnimationFrame(scrollListenerRef.current);
      }
    };
  }, [debouncedHandleScroll, handleResize]);

  // Scroll active item into view in the TOC container
  useEffect(() => {
    if (activeHash && containerRef.current) {
      const activeElement = containerRef.current.querySelector(
        `[href="#${activeHash}"]`
      ) as HTMLAnchorElement;

      if (activeElement && !isScrollingRef.current) {
        isScrollingRef.current = true;

        const container = containerRef.current;
        const elementTop = activeElement.offsetTop;
        const containerScrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const elementHeight = activeElement.clientHeight;

        if (
          elementTop < containerScrollTop ||
          elementTop + elementHeight > containerScrollTop + containerHeight
        ) {
          container.scrollTo({
            top: elementTop - containerHeight / 2 + elementHeight / 2,
            behavior: "smooth",
          });

          // Reset the scrolling flag after animation completes
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 300);
        } else {
          isScrollingRef.current = false;
        }
      }
    }
  }, [activeHash]);

  // Skip rendering if no items
  if (!processedTOCItems || processedTOCItems.length === 0) {
    return null;
  }

  // Styles based on level
  const getMarginByLevel = (level: number) => {
    switch (level) {
      case 1:
        return "ml-0";
      case 2:
        return "ml-3";
      case 3:
        return "ml-6";
      case 4:
        return "ml-9";
      default:
        return "ml-12";
    }
  };

  const getFontSizeByLevel = (level: number) => {
    switch (level) {
      case 1:
        return "text-xl font-bold";
      case 2:
        return "text-base font-medium";
      case 3:
        return "text-sm font-normal";
      default:
        return "text-sm font-light";
    }
  };

  // Gets the display title including context if needed
  const getDisplayTitle = (item: TOCItem) => {
    return item.title;
  };

  // Recursive component to render TOC items
  const renderTOCItems = (items: HierarchicalTOCItem[], level: number = 0) => {
    return items.map((item) => {
      const textSize = getFontSizeByLevel(item.level);
      const marginLeft = getMarginByLevel(item.level);

      const isActive =
        activeHash === item.hash
          ? "border-l-main-blue dark:border-l-sub-skyblue text-main-blue dark:text-sub-skyblue border-l-4"
          : "border-l-2 border-l-gray-light text-gray-dark dark:text-white-dark";

      return (
        <React.Fragment key={`toc-${item.hash}-${item.title}`}>
          <li
            className={`${isActive} text-md tracking-tight leading-6 border-solid pl-2 py-0.5 w-full`}
          >
            <div
              className={`${marginLeft} truncate`}
              title={item.contextTitle || item.title}
            >
              <a
                href={`#${item.hash}`}
                className={`break-all text-inherit hover:text-main-blue dark:hover:text-sub-skyblue transition-colors duration-200 ${textSize}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToElement(item.hash);
                }}
              >
                {getDisplayTitle(item)}
              </a>
            </div>
          </li>
          {item.children && item.children.length > 0 && (
            <ul className="w-full">
              {renderTOCItems(item.children, level + 1)}
            </ul>
          )}
        </React.Fragment>
      );
    });
  };

  // Log for debugging
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `Rendering TOC with ${processedTOCItems.length} unique items from ${
        tableOfContents?.length || 0
      } total items`
    );
    console.log(
      `Hierarchical structure has ${hierarchicalData.length} root items`
    );
  }

  return (
    <div
      style={{ maxHeight: `${containerHeight}px` }}
      ref={containerRef}
      className="space-y-1 mt-4 overflow-hidden hover:overflow-y-auto scroll-smooth"
    >
      <ul className="mt-2 pr-6 w-full">{renderTOCItems(hierarchicalData)}</ul>
    </div>
  );
};

export default TableOfContents;
