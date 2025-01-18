import React from "react";
import { CustomBaseContentBlock } from "../../interfaces/IBlock";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";

const MdBlockImage: React.FC<CustomBaseContentBlock> = ({ specialObject }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            id
            publicURL
            children {
              ... on ImageSharp {
                id
                gatsbyImageData(
                  layout: CONSTRAINED
                  placeholder: DOMINANT_COLOR
                )
              }
            }
          }
        }
      }
    }
  `);

  const fileNode = data.allFile.edges.find(
    (edge: any) => edge.node.id === specialObject.fileId
  );

  const image = fileNode
    ? getImage(fileNode.node.children[0].gatsbyImageData)
    : null;

  return (
    <div className={"flex my-6 justify-center shrink-0 w-full"}>
      {image ? (
        <div
          className={
            "flex flex-col justify-center items-center px-1 max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-xl"
          }
        >
          <GatsbyImage image={image} alt="" className="w-full h-auto" />
          <p className={"mt-2 text-xs text-black dark:text-white"}>
            {specialObject.caption.length > 0
              ? specialObject.caption[0].plain_text
              : ``}
          </p>
        </div>
      ) : (
        <p>Image not found for ID: {specialObject.fileId}</p>
      )}
    </div>
  );
};

export default MdBlockImage;
