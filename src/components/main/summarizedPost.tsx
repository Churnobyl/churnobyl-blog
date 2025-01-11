import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { useFormatDate } from "../../hooks/use-format-date";
import CalenderSvg from "../../images/calenderSvg";
import { ISummarizedPost } from "../../interfaces/ISummarizedPost";
import Category from "../category/category";
import TagList from "../labels/tagList";
import ReadSvg from "../../images/readSvg";

const SummarizedPost: React.FC<ISummarizedPost> = ({
  slug,
  title,
  update_date,
  url,
  version,
  description,
  create_date,
  id,
  category_list,
  tags,
  thumbnail,
  index,
}) => {
  const [convertedCreateDate, setConvertedCreateDate] = useState("");
  const [convertedUpdateDate, setConvertedUpdateDate] = useState("");

  useEffect(() => {
    setConvertedCreateDate(useFormatDate(create_date));
    setConvertedUpdateDate(useFormatDate(update_date));
  }, [create_date, update_date]);

  const image = getImage(thumbnail);

  return (
    <>
      {/* xl 이상에서는 기존 레이아웃 */}
      <div className="group flex justify-between items-center w-full mt-2 py-5 md-5 post-layout">
        <div
          className={
            "flex flex-col justify-evenly space-y-0 w-full xl:w-[600px] h-36"
          }
        >
          <Link to={`/${url}`}>
            <div id={"title-div"} className={"flex items-center"}>
              <span
                className={
                  "text-base md:text-xl text-main-text-black dark:text-white-dark font-bold overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-main-blue group-dark:hover:text-sub-skyblue"
                }
              >
                {title}
              </span>
            </div>
            <div
              className={
                "text-xs md:text-sm line-clamp-3 h-12 xl:h-14 my-1 w-full text-gray dark:text-white-dark"
              }
            >
              {description}
            </div>
          </Link>
          <Category category_list={category_list} />

          <div
            className={"flex flex-col sm:flex-row items-start sm:items-center"}
          >
            <TagList tags={tags} />
            <div
              className={
                "flex flex-row space-x-1 items-center text-gray dark:text-white-dark"
              }
            >
              <CalenderSvg />
              <div
                className={
                  "flex text-xs md:text-sm text-gray dark:text-white-dark"
                }
              >
                {convertedCreateDate}
              </div>
              <div
                className={
                  "flex text-xs md:text-sm text-gray dark:text-white-dark"
                }
              >
                · Updated {convertedUpdateDate}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end pl-2 w-1/4 h-36 min-w-10 max-w-xs group-hover:scale-105 duration-200">
          <Link to={`/${url}`}>
            <div className={"relative"}>
              <div className={"w-full xl:group-hover:brightness-[30%]"}>
                {image ? (
                  <GatsbyImage
                    image={image}
                    alt={title}
                    title={title}
                    className={"rounded-md"}
                    loading={index && index < 3 ? "eager" : "lazy"}
                  />
                ) : (
                  <StaticImage
                    src="../../images/no-content.png"
                    alt="no content"
                    className={"rounded-md"}
                    loading={index && index < 3 ? "eager" : "lazy"}
                  />
                )}
              </div>

              <div
                className={`invisible xl:group-hover:visible absolute inset-0 flex justify-center items-center z-10 text-white flex-col`}
              >
                <ReadSvg />
                <div className={"text-xs font-bold"}>보러 가기!</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SummarizedPost;
