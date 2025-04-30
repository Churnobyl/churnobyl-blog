import React, { useEffect, useRef } from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";

// KaTeX is a popular library for rendering math equations
// You may need to add it to your dependencies:
// npm install katex
// npm install @types/katex
// And include the CSS in your project:
// import 'katex/dist/katex.min.css';

declare global {
  interface Window {
    katex?: any;
  }
}

const MdBlockEquation: React.FC<CustomBaseContentBlock> = ({
  type,
  specialObject,
}) => {
  const { expression } = specialObject || {};
  const equationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if KaTeX is available globally
    if (expression && window.katex && equationRef.current) {
      try {
        window.katex.render(expression, equationRef.current, {
          throwOnError: false,
          displayMode: true,
        });
      } catch (error) {
        console.error("KaTeX rendering error:", error);
      }
    } else {
      // Fallback to display raw LaTeX if KaTeX is not available
      if (equationRef.current) {
        equationRef.current.textContent = expression;
      }
    }
  }, [expression]);

  if (!expression) {
    return null;
  }

  return (
    <div className="my-4 overflow-x-auto">
      {/* KaTeX will render into this div if available */}
      <div
        ref={equationRef}
        className="p-4 bg-gray-50 dark:bg-gray-800 rounded text-center text-main-text-black dark:text-white-dark"
      >
        {/* Fallback display */}
        {expression}
      </div>
    </div>
  );
};

export default MdBlockEquation;
