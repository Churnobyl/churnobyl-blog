import React from "react";

const NotionPageTemplate = ({ pageContext }: { pageContext: any }) => {
  const { id, title, content } = pageContext;

  return (
    <div id={id}>
      <h1>{title}</h1>
      <pre>
        {typeof content === "string"
          ? content
          : JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
};

export default NotionPageTemplate;
