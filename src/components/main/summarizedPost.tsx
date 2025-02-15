import { Link } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import React from "react";
import CalenderSvg from "../../images/calenderSvg";
import ReadSvg from "../../images/readSvg";
import { ISummarizedPost } from "../../interfaces/ISummarizedPost";
import Category from "../category/category";
import TagList from "../labels/tagList";
import SearchSvg from "../svg/searchSvg";
import classNames from "classnames";

const SummarizedPost: React.FC<ISummarizedPost> = ({
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
  isShort = false,
}) => {
  return (
    <>
      {/* xl 이상에서는 기존 레이아웃 */}
      <div className="group flex flex-col-reverse xs:flex-row justify-between items-center w-full mb-10 py-10 xs:mt-2 xs:py-5 xs:md-5">
        <div
          className={
            "flex flex-col justify-evenly space-y-0 w-auto xl:w-[600px] h-36"
          }
        >
          <Link to={`/${url}`}>
            <div id={"title-div"} className={"flex items-center w-full"}>
              <div
                className={
                  "text-base md:text-xl w-full text-main-text-black dark:text-white-dark font-bold whitespace-break-spaces group-hover:text-main-blue group-hover:dark:text-sub-skyblue antialiased"
                }
              >
                {title}
              </div>
            </div>
            <div
              className={
                "text-xs xl:text-sm line-clamp-3 h-12 xl:h-14 my-1 w-full text-gray dark:text-white-dark antialiased"
              }
            >
              {description}
            </div>
          </Link>
          <Category category_list={category_list} />

          <div
            className={classNames(
              "flex flex-col w-full",
              { "sm:flex-row items-start sm:items-center": !isShort },
              { "sm:flex-col sm:items-start": isShort }
            )}
          >
            <TagList tags={tags} isHorizontal={true} />
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
                {create_date}
              </div>
              <div
                className={
                  "flex text-xs md:text-sm text-gray dark:text-white-dark"
                }
              >
                · Updated {update_date}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full xs:justify-end pb-2 xs:pl-2 xs:w-[90px] sm:w-[130px] xs:h-36 xs:min-w-24 group-hover:scale-105 duration-200">
          <Link to={`/${url}`}>
            <div className={"relative"}>
              <div className={"w-full group-hover:brightness-[30%]"}>
                {thumbnail ? (
                  <GatsbyImage
                    image={thumbnail?.childImageSharp?.gatsbyImageData}
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
                className={`invisible group-hover:visible absolute inset-0 flex justify-center items-center z-10 text-white flex-col`}
              >
                <SearchSvg />
                <div className={"text-xs font-bold"}>Detail</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SummarizedPost;
