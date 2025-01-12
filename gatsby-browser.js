import "./src/styles/global.css";
require("prism-themes/themes/prism-coldark-dark.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

export const onInitialClientRender = () => {
  // Pretendard 폰트 preconnect 및 link 추가
  const preconnectJsdelivr = document.createElement("link");
  preconnectJsdelivr.rel = "preconnect";
  preconnectJsdelivr.href = "https://cdn.jsdelivr.net";

  const linkPretendard = document.createElement("link");
  linkPretendard.rel = "stylesheet";
  linkPretendard.href =
    "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";

  document.head.appendChild(preconnectJsdelivr);
  document.head.appendChild(linkPretendard);

  // Kakao SDK script 추가
  const kakaoScript = document.createElement("script");
  kakaoScript.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
  kakaoScript.integrity =
    "sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka";
  kakaoScript.crossOrigin = "anonymous";
  kakaoScript.async = true; // async 추가
  kakaoScript.onload = () => {
    if (typeof window !== "undefined" && window.Kakao) {
      window.Kakao.init("484abd80e306b4779f00fc89156bbafc");
    }
  };

  document.body.appendChild(kakaoScript);
};
