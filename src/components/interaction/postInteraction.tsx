import React, { useEffect, useState, useRef } from "react";
import EyesSvg from "../../images/eyesSvg";
import LikeSvg from "../../images/likeSvg";
import classNames from "classnames";

const PostInteractions = ({ slug }: { slug: string }) => {
  const [viewCnt, setViewCnt] = useState(0);
  const [likeCnt, setLikeCnt] = useState(0);
  const [liked, setLiked] = useState(false);

  const pendingLike = useRef<{ type: string; deviceId: string } | null>(null);

  const getDeviceId = () => {
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem("device_id", deviceId);
    }
    return deviceId;
  };

  const sendPendingLike = async () => {
    if (!pendingLike.current) return;

    const requestData = {
      slug,
      ...pendingLike.current,
    };

    try {
      const response = await fetch(`/api/interact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
    } catch (error) {
    } finally {
      pendingLike.current = null;
    }
  };

  const recordViewAndLikeStatus = async () => {
    const deviceId = getDeviceId();

    try {
      const response = await fetch(`/api/interact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, type: "view", deviceId }),
      });
      const data = await response.json();

      setViewCnt(data.viewCnt || 0);
      setLikeCnt(data.likeCnt || 0);

      const isLiked = data.liked || false;
      setLiked(isLiked);
    } catch (error) {
      console.error("Failed to record view or fetch like status:", error);
    }
  };

  const handleLike = () => {
    const deviceId = getDeviceId();

    if (liked) {
      setLiked(false);
      setLikeCnt((prev) => prev - 1);
      pendingLike.current = { type: "unlike", deviceId };
    } else {
      setLiked(true);
      setLikeCnt((prev) => prev + 1);
      pendingLike.current = { type: "like", deviceId };
    }
  };

  useEffect(() => {
    recordViewAndLikeStatus();
    return () => {
      sendPendingLike();
    };
  }, [slug]);

  return (
    <div
      className={
        "flex flex-row space-x-5 bg-gray-light w-36 h-12 justify-center items-center rounded-full"
      }
    >
      <div className={"flex flex-row items-center justify-center space-x-1"}>
        <EyesSvg />
        <span className={"text-gray-dark"}>{viewCnt}</span>
      </div>
      <div
        onClick={handleLike}
        className={classNames(
          "rounded-full border-solid border-2 border-gray hover:border-main-blue hover:border-opacity-50"
        )}
      >
        <LikeSvg liked={liked} />
      </div>
    </div>
  );
};

export default PostInteractions;
