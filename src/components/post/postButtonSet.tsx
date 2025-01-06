import React, { useEffect } from "react";
import LikeSvg from "../../images/likeSvg";
import classNames from "classnames";
import { IPostInteractions } from "../../interfaces/IPostInteraction";
import { useSiteMetadata } from "../../hooks/use-site-metadata";
import { getSrc } from "gatsby-plugin-image";
import LinkSvg from "../../images/linkSvg";
import { copyToClipboard } from "../../hooks/use-copy-to-clipboard";
import KakaoSvg from "../../images/kakaoSvg";

const PostButtonSet = ({
  likeCnt,
  liked,
  handleLike,
  content,
}: IPostInteractions) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    siteUrl,
  } = useSiteMetadata();

  const image = content?.thumbnail?.childImageSharp?.gatsbyImageData;
  const imageUrl = image ? getSrc(image) : defaultImage;

  const info = {
    title: content?.title || defaultTitle,
    description: content?.description || defaultDescription,
    image: imageUrl ? `${siteUrl}${imageUrl}` : undefined,
    url: `${siteUrl}/${content?.url || ``}`,
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    script.integrity =
      "sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if (typeof window !== "undefined" && window.Kakao) {
        window.Kakao.init("484abd80e306b4779f00fc89156bbafc");
        window.Kakao.Share.createDefaultButton({
          container: "#kakaotalk-sharing-btn",
          objectType: "feed",
          content: {
            title: info.title,
            description: info.description,
            imageUrl: info.image,
            link: {
              mobileWebUrl: info.url,
              webUrl: info.url,
            },
          },
          social: {
            likeCount: likeCnt,
            // commentCount: 45,
            // sharedCount: 845,
          },
          buttons: [
            {
              title: "자세히 보기",
              link: {
                mobileWebUrl: info.url,
                webUrl: info.url,
              },
            },
          ],
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleKakaoShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: info.title,
          description: info.description,
          imageUrl: info.image,
          link: {
            mobileWebUrl: info.url,
            webUrl: info.url,
          },
        },
        social: {
          likeCount: likeCnt,
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: info.url,
              webUrl: info.url,
            },
          },
        ],
      });
    }
  };

  return (
    <div
      className={
        "inline-flex flex-row space-x-2 rounded-full border-solid border-2 border-gray-light py-1 px-4"
      }
    >
      <div className={"flex flex-row items-center space-x-2"}>
        <div
          onClick={handleLike}
          className={classNames(
            "hover:border-main-blue hover:border-opacity-50 cursor-pointer text-main-text-black dark:text-white-dark"
          )}
        >
          <LikeSvg width={28} height={28} liked={liked} />
        </div>
      </div>
      <div
        className={
          "flex justify-center items-center cursor-pointer dark:text-white-dark"
        }
        onClick={copyToClipboard}
      >
        <LinkSvg />
      </div>
      <div className={"flex items-center justify-center dark:text-white-dark"}>
        <button id="kakaotalk-sharing-btn" onClick={handleKakaoShare}>
          <KakaoSvg />
        </button>
      </div>
    </div>
  );
};

export default PostButtonSet;
