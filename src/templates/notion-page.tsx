import React from "react";

const NotionPageTemplate = ({ pageContext }: { pageContext: any }) => {
  const { title, rawJson } = pageContext;

  return (
    <div>
      <h1>{title}</h1>
      <pre>{JSON.stringify(rawJson, null, 2)}</pre>
    </div>
  );
};

export default NotionPageTemplate;
