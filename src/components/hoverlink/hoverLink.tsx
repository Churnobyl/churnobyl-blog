import React, { useState, useEffect, useCallback } from "react";

interface HoverModalProps {
  url: string;
  position: { x: number; y: number };
}

const HoverModal: React.FC<HoverModalProps> = ({ url, position }) => {
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          `/api/scrape-metadata?url=${encodeURIComponent(url)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const metadata = await response.json();
        setMetadata(metadata);
      } catch (error: any) {
        console.error("Error fetching metadata:", error.message);
        setMetadata(null);
      }
    };

    fetchMetadata();
  }, [url]);

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
          className="w-full max-h-[100px] object-cover mb-2"
        />
      )}
      <h3 className="m-0 text-sm font-bold">{metadata.title}</h3>
      <p className="m-0 text-xs text-gray-dark mt-1">{metadata.description}</p>
      <p className="m-0 text-xs text-gray-dark mt-1">{url}</p>
    </div>
  );
};

const HoverLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      setPosition({ x: e.clientX, y: e.clientY });
    },
    [setPosition]
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
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="text-main-blue font-bold hover:underline hover:text-gray-dark"
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
