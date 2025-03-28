import React, { useEffect, useRef, useState } from "react";

const CommentGiscus = () => {
  const commentsEl = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string>("pending");

  useEffect(() => {
    const scriptEl = document.createElement("script");

    scriptEl.onload = () => setStatus("success");
    scriptEl.onerror = () => setStatus("failed");
    scriptEl.async = true;
    scriptEl.src = "https://giscus.app/client.js";

    scriptEl.setAttribute("data-repo", "Churnobyl/blog-comments");
    scriptEl.setAttribute("data-repo-id", "R_kgDONizm9Q");
    scriptEl.setAttribute("data-category", "Comments");
    scriptEl.setAttribute("data-category-id", "DIC_kwDONizm9c4Coi1m");
    scriptEl.setAttribute("data-mapping", "pathname");
    scriptEl.setAttribute("data-strict", "0");
    scriptEl.setAttribute("data-reactions-enabled", "1");
    scriptEl.setAttribute("data-emit-metadata", "0");
    scriptEl.setAttribute("data-input-position", "bottom");
    scriptEl.setAttribute("data-theme", "light_high_contrast");
    scriptEl.setAttribute("data-lang", "ko");
    scriptEl.setAttribute("crossorigin", "anonymous");

    if (commentsEl.current) {
      commentsEl.current.appendChild(scriptEl);
    }

    return () => {
      if (commentsEl.current) {
        commentsEl.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="comments-wrapper">
      {status === "failed" && (
        <div className={"text-main-text-black dark:text-white-dark"}>
          Error. Please try again.
        </div>
      )}
      {status === "pending" && (
        <div className={"text-main-text-black dark:text-white-dark"}>
          Loading script...
        </div>
      )}
      <div ref={commentsEl} />
    </div>
  );
};

export default CommentGiscus;
