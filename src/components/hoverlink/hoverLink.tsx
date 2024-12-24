import { graphql, useStaticQuery } from "gatsby";
import React, { useState, useEffect, useCallback } from "react";

interface HoverModalProps {
  url: string;
  position: { x: number; y: number };
}

const HoverModal: React.FC<HoverModalProps> = ({ url, position }) => {
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
      className="fixed bg-white shadow-md p-3 rounded-lg z-[1000] max-w-[200px] break-words"
      style={{ top: position.y + 10, left: position.x + 10 }}
    >
      {metadata.image && (
        <img
          src={metadata.image}
          alt={metadata.title}
          className="w-full max-h-[100px] object-cover mb-2 rounded"
        />
      )}
      <h3 className="text-sm font-semibold">{metadata.title}</h3>
      <p className="text-xs text-gray-500 mt-1">{metadata.description}</p>
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
};

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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      setPosition({ x: e.clientX, y: e.clientY });
    },
    []
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setHovered(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

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
        className="text-main-blue font-bold hover:underline hover:text-black"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
      {hovered && <HoverModal url={href} position={position} />}
    </>
  );
};

export default HoverLink;
