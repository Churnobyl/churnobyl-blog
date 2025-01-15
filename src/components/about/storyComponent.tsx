import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";

interface IStoryComponent {
  text: string | string[];
  imageName: string;
  imageLocation: "left" | "right";
}

const StoryComponent = ({
  text,
  imageName,
  imageLocation,
}: IStoryComponent) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "about" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 300, layout: CONSTRAINED)
          }
        }
      }
    }
  `);
  const images: { [key: string]: IGatsbyImageData } = data.allFile.nodes.reduce(
    (acc: { [key: string]: IGatsbyImageData }, node: any) => {
      acc[node.name] = node.childImageSharp.gatsbyImageData;
      return acc;
    },
    {}
  );

  const image = getImage(images[imageName]);
  const isArray = Array.isArray(text);

  return (
    <div
      className={`flex justify-between space-y-4 md:space-y-0 items-center flex-col md:flex-row ${
        imageLocation === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      {image && (
        <GatsbyImage
          image={image}
          alt={imageName}
          className="w-[300px] rounded-md"
        />
      )}
      <div
        className={`flex-col justify-between items-center ${
          imageLocation === "right" ? "flex-row-reverse" : ""
        }`}
      >
        {isArray
          ? (text as string[]).map((paragraph, index) => (
              <p
                key={index}
                className="mb-1 text-center md:text-left text-main-text-black dark:text-white-dark"
              >
                {paragraph}
              </p>
            ))
          : text}
      </div>
    </div>
  );
};

export default StoryComponent;
