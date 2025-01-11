import React from "react";

interface LikeSvgProps {
  width: number;
  height: number;
  liked: boolean;
}

const LikeSvg: React.FC<LikeSvgProps> = ({ width, height, liked }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 800 800"
      width={width}
      height={height}
      className="like-svg"
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="like-btn">
          <stop
            stopColor="var(--stop-color-1, #006bff)"
            stopOpacity="1"
            offset="0%"
          />
          <stop
            stopColor="var(--stop-color-2, #7fa0e1)"
            stopOpacity="1"
            offset="100%"
          />
        </linearGradient>
      </defs>
      <g
        fill={liked ? "url(#like-btn)" : "transparent"}
        strokeWidth="40"
        stroke={liked ? "transparent" : "currentColor"}
        id="heart"
        transform="matrix(1,0,0,1,0,-20)"
      >
        <path
          d="M394.4055830948837 275.52448288710804C712.9370563813857 20.979024580308618 858.7412642899094 565.0349483890133 400 700 -58.741264289909395 565.0349483890133 87.06294361861433 20.979024580308618 394.4055830948837 275.52448288710804Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export default LikeSvg;
