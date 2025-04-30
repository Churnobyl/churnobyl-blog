import React, { useEffect, useRef, useState } from "react";

const CommentGiscus = () => {
  const commentsEl = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string>("pending");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // 다크모드 감지
  useEffect(() => {
    const checkDarkMode = () => {
      if (typeof window !== "undefined") {
        const isDark = document.documentElement.classList.contains("dark");
        setIsDarkMode(isDark);
      }
    };

    // 초기 상태 확인
    checkDarkMode();

    // DOM 변경 감지 - dark 클래스 추가/제거 감지
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

    if (typeof window !== "undefined" && document.documentElement) {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Giscus 스크립트 로드
  useEffect(() => {
    if (commentsEl.current) {
      commentsEl.current.innerHTML = "";
    }

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
    scriptEl.setAttribute("data-reactions-enabled", "0");
    scriptEl.setAttribute("data-emit-metadata", "0");
    scriptEl.setAttribute("data-input-position", "bottom");
    scriptEl.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light_high_contrast"
    );
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
  }, [isDarkMode]); // isDarkMode가 변경될 때마다 스크립트 다시 로드

  // 다크모드 변경 시 iframe 내 테마 변경
  useEffect(() => {
    if (status === "success") {
      const iframe = document.querySelector<HTMLIFrameElement>(
        "iframe.giscus-frame"
      );
      if (iframe) {
        try {
          const theme = isDarkMode ? "dark" : "light_high_contrast";
          iframe.contentWindow?.postMessage(
            { giscus: { setConfig: { theme } } },
            "https://giscus.app"
          );
        } catch (e) {
          console.error("Failed to update Giscus theme:", e);
        }
      }
    }
  }, [isDarkMode, status]);

  return (
    <div className="comments-wrapper my-8">
      {status === "failed" && (
        <div className={"text-main-text-black dark:text-white-dark"}>
          Error. Please try again.
        </div>
      )}
      {status === "pending" && (
        <div className={"text-main-text-black dark:text-white-dark"}>
          Loading comments...
        </div>
      )}
      <div ref={commentsEl} />
    </div>
  );
};

export default CommentGiscus;
