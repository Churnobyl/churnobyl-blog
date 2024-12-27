import React, { useEffect, useRef, useState } from "react";

const CommentUtterances = () => {
  const commentsEl = useRef(null);
  const [status, setStatus] = useState<string>("pending");

  useEffect(() => {
    const scriptEl = document.createElement("script");

    scriptEl.onload = () => setStatus("success");
    scriptEl.onerror = () => setStatus("failed");
    scriptEl.async = true;
    scriptEl.src = "https://utteranc.es/client.js";
    scriptEl.setAttribute("repo", "Churnobyl/blog-comments");
    scriptEl.setAttribute("issue-term", "pathname");
    scriptEl.setAttribute("theme", "boxy-light");
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
      {status === "failed" && <div>Error. Please try again.</div>}
      {status === "pending" && <div>Loading script...</div>}
      <div ref={commentsEl} />
    </div>
  );
};

export default CommentUtterances;
