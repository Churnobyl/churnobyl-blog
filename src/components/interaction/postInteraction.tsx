import React, { useEffect, useState, useRef } from "react";
import EyesSvg from "../../images/eyesSvg";
import LikeSvg from "../../images/likeSvg";
import classNames from "classnames";
import { IPostInteractions } from "../../interfaces/IPostInteraction";

const PostInteractions = ({
  viewCnt,
  likeCnt,
  liked,
  handleLike,
}: IPostInteractions) => {
  return (
    <div
      className={
        "flex flex-row space-x-5 bg-gray-light w-40 h-12 justify-center items-center rounded-full"
      }
    >
      <div className={"flex flex-row items-center justify-center space-x-1"}>
        <EyesSvg />
        <span className={"text-gray-dark w-4"}>{viewCnt}</span>
      </div>
      <div className={"flex flex-row items-center justify-center space-x-2"}>
        <div
          onClick={handleLike}
          className={classNames(
            "rounded-full border-solid border-2 border-gray hover:border-main-blue hover:border-opacity-50 text-gray-dark"
          )}
        >
          <LikeSvg width={28} height={28} liked={liked} />
        </div>
        <div className={"text-gray-dark w-4"}>{likeCnt}</div>
      </div>
    </div>
  );
};

export default PostInteractions;
