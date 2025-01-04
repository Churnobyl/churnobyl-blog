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
    <div className={"flex my-10 justify-center shrink-0"}>
      {image ? (
        <div>
          <GatsbyImage image={image} alt="" />
          <p>{specialObject.captions ? specialObject.captions[0] : ``}</p>
        </div>
      ) : (
        <p>Image not found for ID: {specialObject.fileId}</p>
      )}
    </div>
  );
};

export default MdBlockImage;
