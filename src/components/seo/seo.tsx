import React from "react";
import { useSiteMetadata } from "../../hooks/use-site-metadata";
import { getImage, getSrc, IGatsbyImageData } from "gatsby-plugin-image";

interface SEO {
  title?: string;
  description?: string;
  pathname?: string;
  image?: IGatsbyImageData;
  children?: React.ReactNode;
}

export const SEO = ({ title, description, pathname, image }: SEO) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    siteUrl,
  } = useSiteMetadata();

  const imageUrl = image ? getSrc(image) : defaultImage;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: imageUrl ? `${siteUrl}${imageUrl}` : undefined,
    url: `${siteUrl}/${pathname || ``}`,
  };

  return (
    <>
      <html lang="ko" />
      <title>
        {title ? `${seo.title} | ` : ""}
        {defaultTitle}
      </title>
      <meta
        property="og:title"
        content={`${title ? seo.title + " | " : ""}${defaultTitle}`}
      />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:description" content={seo.description} />
      <meta name="description" content={seo.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
};
