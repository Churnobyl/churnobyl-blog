import "./src/styles/global.css";
require("prism-themes/themes/prism-coldark-dark.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

export const onInitialClientRender = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (theme === "light") {
    document.documentElement.classList.add("light");
  }

  // Preconnect jsDelivr
  const preconnectJsdelivr = document.createElement("link");
  preconnectJsdelivr.rel = "preconnect";
  preconnectJsdelivr.href = "https://cdn.jsdelivr.net";
  document.head.appendChild(preconnectJsdelivr);

  // Load Pretendard Font
  const linkPretendard = document.createElement("link");
  linkPretendard.rel = "stylesheet";
  linkPretendard.href =
    "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";
  document.head.appendChild(linkPretendard);

  // Load Kakao Script
  const kakaoScript = document.createElement("script");
  kakaoScript.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
  kakaoScript.integrity =
    "sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka";
  kakaoScript.crossOrigin = "anonymous";
  kakaoScript.async = true;
  kakaoScript.onload = () => {
    if (typeof window !== "undefined" && window.Kakao) {
      window.Kakao.init("484abd80e306b4779f00fc89156bbafc");
    }
  };
  document.body.appendChild(kakaoScript);

  // Load Algolia CSS
  const linkAlgolia = document.createElement("link");
  linkAlgolia.rel = "stylesheet";
  linkAlgolia.href =
    "https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css";
  document.head.appendChild(linkAlgolia);

  // Load Algolia Script
  const algoliaScript = document.createElement("script");
  algoliaScript.src =
    "https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js";
  algoliaScript.async = true;
  algoliaScript.onload = () => {
    if (typeof algoliasearchNetlify === "function") {
      algoliasearchNetlify({
        appId: "8UJFG7KP7L",
        apiKey: "6d5f9fd93f6c20ccbec8e9e3e4d3d36b",
        siteId: "ef684d8c-ed03-44fc-a7dc-f4211a8c35c1",
        branch: "main",
        selector: "div#search",
      });
    }
  };
  document.body.appendChild(algoliaScript);
};
