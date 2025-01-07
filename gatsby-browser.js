import "./src/styles/global.css";
require("prism-themes/themes/prism-coldark-dark.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

export const onInitialClientRender = () => {
  const preconnect = document.createElement("link");
  preconnect.rel = "preconnect";
  preconnect.href = "https://cdn.jsdelivr.net";

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";

  document.head.appendChild(preconnect);
  document.head.appendChild(link);
};
