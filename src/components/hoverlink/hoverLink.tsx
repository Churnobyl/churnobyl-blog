import classNames from "classnames";
import { randomInt, randomUUID } from "crypto";
import { graphql, useStaticQuery } from "gatsby";
import React, { useState, useEffect, useCallback } from "react";

interface HoverModalProps {
  url: string;
  position: { x: number; y: number };
  hovered: boolean;
}

const HoverModal: React.FC<HoverModalProps> = React.memo(
  ({ url, position, hovered }) => {
    const data = useStaticQuery(graphql`
      query {
        allNMetadata {
          nodes {
            id
            title
            description
            image
            url
          }
        }
      }
    `);

    const metadata =
      data.allNMetadata.nodes.find((node: any) => node.id === url) || null;

    if (!metadata) return null;
    return (
      <div
        className={classNames(
          `fixed bg-white shadow-md p-3 rounded-lg z-[1000] max-w-[200px] break-words break-keep`,
          { block: hovered }
        )}
        style={{ top: position.y + 10, left: position.x + 10 }}
      >
        {metadata.image && (
          <img
            src={metadata.image}
            alt={metadata.title}
            className="w-full max-h-[100px] object-cover mb-2 rounded"
          />
        )}
        <h3 className="text-sm text-main-text-black font-semibold">
          {metadata.title}
        </h3>
        <p className="text-xs text-main-text-black mt-1">
          {metadata.description}
        </p>
        <a
          href={metadata.url}
          className="text-xs text-main-blue hover:underline mt-2 block"
          target="_blank"
          rel="noopener noreferrer"
        >
          {metadata.url}
        </a>
      </div>
    );
  }
);

const HoverLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const data = useStaticQuery(graphql`
    query {
      allNMetadata {
        nodes {
          id
          title
          description
          image
          url
        }
      }
    }
  `);

  const metadata =
    data.allNMetadata.nodes.find((node: any) => node.id === href) || null;

  if (!metadata) return null;

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      setHovered(true);
      setPosition({ x: e.clientX, y: e.clientY });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      setPosition({ x: e.clientX, y: e.clientY });
    },
    []
  );

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <a
        href={metadata.url}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="text-sm xl:text-base text-main-blue dark:text-sub-skyblue font-bold hover:underline hover:text-sub-skyblue hover:dark:text-gray"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
      {hovered && (
        <HoverModal url={href} position={position} hovered={hovered} />
      )}
    </>
  );
};

export default HoverLink;
