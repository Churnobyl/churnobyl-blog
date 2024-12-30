import React from "react";
import { useSiteMetadata } from "../../hooks/use-site-metadata";

interface SEO {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  children?: React.ReactNode;
}

export const SEO = ({ title, description, pathname, image }: SEO) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    siteUrl,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${siteUrl}${pathname || ``}`,
  };

  return (
    <>
      <title>
        {title ? `${seo.title} | ` : ""}
        {defaultTitle}
      </title>
      <meta
        property="og:title"
        content={`${title ? seo.title : ""}${defaultTitle}`}
      />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={`${siteUrl}${seo.image}`} />
      <meta property="og:description" content={seo.description} />
      <meta name="description" content={seo.description} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
};
