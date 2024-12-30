import { MouseEvent } from "react";

const useSmoothScroll = (offset: number = 80) => {
  const scrollToElement = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleAnchorClick = (
    e: MouseEvent<HTMLAnchorElement>,
    id: string | undefined
  ) => {
    if (id == undefined) return;
    e.preventDefault();
    scrollToElement(id);
  };

  return { handleAnchorClick, scrollToElement };
};

export default useSmoothScroll;
