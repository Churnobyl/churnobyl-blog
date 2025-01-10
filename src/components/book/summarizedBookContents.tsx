import { Link } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { useFormatDate } from "../../hooks/use-format-date";
import CalenderSvg from "../../images/calenderSvg";
import { ISummarizedPost } from "../../interfaces/ISummarizedPost";

const SummarizedBookContents: React.FC<ISummarizedPost> = ({
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
  book_index,
}) => {
  const [convertedCreateDate, setConvertedCreateDate] = useState("");
  const [convertedUpdateDate, setConvertedUpdateDate] = useState("");

  useEffect(() => {
    setConvertedCreateDate(useFormatDate(create_date));
    setConvertedUpdateDate(useFormatDate(update_date));
  }, [create_date, update_date]);
  const image = getImage(thumbnail);

  return (
    <div>
      {/* xl 이상에서는 기존 레이아웃 */}
      <div className="hidden lg:flex flex-row space-x-10 items-center w-full my-2">
        <div className={"font-bold text-main-text-black dark:text-white-dark"}>
          Chapter {book_index}
        </div>
        <div className="flex justify-end items-center w-[104px] h-36 min-w-20 max-w-xs">
          <Link to={`/${url}`}>
            {image ? (
              <GatsbyImage
                image={image}
                alt={title}
                title={title}
                className={"rounded-sm"}
              />
            ) : (
              <StaticImage
                src="../../images/no-content.png"
                alt="no content"
                className={"rounded-sm"}
              />
            )}
          </Link>
        </div>
        <div
          className={"flex flex-col justify-evenly space-y-0 w-[600px] h-20"}
        >
          <div id={"title-div"} className={"flex items-center space-x-2"}>
            <div
              className={
                "text-lg md:text-xl text-main-text-black dark:text-white-dark font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:text-main-blue dark:hover:text-sub-skyblue"
              }
            >
              <Link to={`/${url}`}>{title}</Link>
            </div>

            <div className={"flex flex-row items-center"}>
              <div className={"flex flex-row space-x-1 items-center"}>
                <div
                  className={
                    "flex text-xs md:text-sm text-gray dark:text-white-dark"
                  }
                >
                  · Updated {convertedUpdateDate}
                </div>
              </div>
            </div>

            {/* {showNew && <Label text="new" />}
            {showUpdated && <Label text="updated" />} */}
          </div>
          <div
            className={
              "text-base md:text-md line-clamp-1 h-8 w-full text-gray dark:text-white-dark"
            }
          >
            {description}
          </div>
        </div>
      </div>

      {/* xl 이하에서는 카드 레이아웃 */}
      <div className="flex flex-col lg:hidden space-y-4 justify-center items-center w-full p-4 mb-16">
        <div className={"font-bold text-main-text-black dark:text-white-dark"}>
          Chapter {book_index}
        </div>
        <div className="flex w-full items-center text-main-text-black dark:text-white-dark">
          <Link to={`/${url}`}>
            {image ? (
              <GatsbyImage
                image={image}
                alt={title}
                title={title}
                className={`
                  rounded-md
                `}
              />
            ) : (
              <StaticImage
                src="../../images/no-content.png"
                alt="no content"
                className={"rounded-sm"}
              />
            )}
          </Link>
        </div>
        <div className={"flex flex-col justify-center space-y-2 w-full"}>
          <div id={"title-div"} className={"flex items-center"}>
            <span
              className={
                "text-xl font-bold text-main-text-black dark:text-white-dark overflow-hidden text-ellipsis whitespace-nowrap"
              }
            >
              <Link to={`/${url}`}>{title}</Link>
            </span>
          </div>

          <div
            className={
              "text-base md:text-md line-clamp-2 h-12 w-full text-gray dark:text-white-dark"
            }
          >
            {description}
          </div>
          <div className={"flex flex-col space-y-1"}>
            <div className={"flex flex-row space-x-1 items-center"}>
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
      </div>
      <hr className={"my-5 border-gray-light"} />
    </div>
  );
};

export default SummarizedBookContents;
