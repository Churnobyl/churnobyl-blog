import React, { useEffect } from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import Prism from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-git";
import "prismjs/components/prism-gradle";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-groovy";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-mongodb";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-regex";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-toml";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";

import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

function toCapitalize(str: string) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

function toNormalize(language: string) {
  const mapping: { [key: string]: string } = {
    "c++": "cpp",
    "c#": "csharp",
    python: "python",
    java: "java",
    bash: "bash",
    javascript: "javascript",
    typescript: "typescript",
    json: "json",
    yaml: "yaml",
    html: "markup", // Prism uses 'markup' for HTML
    css: "css",
    sql: "sql",
    graphql: "graphql",
    ruby: "ruby",
    php: "php",
    kotlin: "kotlin",
    swift: "swift",
    go: "go",
    rust: "rust",
    dockerfile: "docker",
    nginx: "nginx",
    perl: "perl",
    dart: "dart",
    groovy: "groovy",
    toml: "toml",
    tsx: "tsx",
    jsx: "jsx",
    gradle: "gradle",
    mongodb: "mongodb",
    regex: "regex",
  };

  return mapping[language.toLowerCase()] || language.toLowerCase();
}

let isLanguageDisplayRegistered = false;

const MdBlockCode: React.FC<CustomBaseContentBlock> = ({
  id,
  specialObject,
}) => {
  const lang = `language-${toNormalize(specialObject.language)}`;

  useEffect(() => {
    if (!isLanguageDisplayRegistered) {
      Prism.plugins.toolbar.registerButton(
        "language-display",
        (env: { language: string }) => {
          const span = document.createElement("span");
          span.innerText = env.language ? toCapitalize(env.language) : "Text";
          span.style.cssText = `
          background-color: transparent;
          padding: 2px 8px;
          font-size: 12px;
          color: #a1a1a1;
          margin-left: auto;
          cursor: default;
        `;
          return span;
        }
      );
      isLanguageDisplayRegistered = true;
    }

    Prism.highlightAll();
  }, []);

  return (
    <div
      className="flex flex-col code-card line-numbers space-y-0 my-5"
      data-prismjs-copy-timeout="500"
    >
      <pre
        data-toolbar-order="copy-to-clipboard,language-display"
        className={`${lang} code-toolbar`}
      >
        <code
          className={`${lang} text-xs xl:text-sm sm:text-base`}
          data-prismjs-copy="복사"
          data-prismjs-copy-error="복사 실패"
          data-prismjs-copy-success="성공!"
        >
          {specialObject.rich_text[0].plain_text}
        </code>
      </pre>
    </div>
  );
};

export default MdBlockCode;
