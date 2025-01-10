import React, { useEffect, useState } from "react";
import { IBook } from "../../interfaces/IBook";
import { useFormatDate } from "../../hooks/use-format-date";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import CalenderSvg from "../../images/calenderSvg";

interface SummarizedBookProps {
  data: IBook;
  index: number;
}

const SummarizedBook: React.FC<SummarizedBookProps> = ({ data, index }) => {
  const {
    book_category,
    book_image,
    book_name,
    create_date,
    id,
    update_date,
    url,
    description,
  } = data;

  const [convertedCreateDate, setConvertedCreateDate] = useState("");
  const [convertedUpdateDate, setConvertedUpdateDate] = useState("");

  useEffect(() => {
    setConvertedCreateDate(useFormatDate(create_date));
    setConvertedUpdateDate(useFormatDate(update_date));
  }, [create_date, update_date]);

  const image = getImage(book_image);

  return (
    <>
      {/* xl 이상에서는 기존 레이아웃 */}
      <div className="hidden lg:flex flex-row space-x-20 items-center w-full my-10 post-layout">
        <div className="flex justify-end items-center w-[208px] h-36 min-w-40 max-w-xs">
          <Link to={`/${url}`}>
            {image ? (
              <GatsbyImage
                image={image}
                alt={book_name}
                title={book_name}
                className={"rounded-sm"}
                loading={index && index < 3 ? "eager" : "lazy"}
              />
            ) : (
              <StaticImage
                src="../../images/no-content.png"
                alt="no content"
                className={"rounded-sm"}
                loading={index && index < 3 ? "eager" : "lazy"}
              />
            )}
          </Link>
        </div>
        <div
          className={"flex flex-col justify-evenly space-y-0 w-[600px] h-36"}
        >
          <Link to={`/${url}`}>
            <div id={"title-div"} className={"flex items-center"}>
              <span
                className={
                  "text-lg md:text-xl text-main-text-black dark:text-white-dark font-bold overflow-hidden text-ellipsis whitespace-nowrap"
                }
              >
                {book_name}
              </span>
            </div>
            <div
              className={
                "text-base md:text-md line-clamp-2 h-12 my-2 w-full text-gray dark:text-white-dark"
              }
            >
              {description}
            </div>
          </Link>

          <div className={"flex flex-row items-center"}>
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
      </div>

      {/* xl 이하에서는 카드 레이아웃 */}
      <div className="flex flex-col lg:hidden space-y-4 justify-center items-center w-full p-4 mb-16">
        <div className="flex w-full items-center">
          <Link to={`/${url}`}>
            {image ? (
              <GatsbyImage
                image={image}
                alt={book_name}
                title={book_name}
                className={`rounded-md`}
                loading={index && index < 2 ? "eager" : "lazy"}
              />
            ) : (
              <StaticImage
                src="../../images/no-content.png"
                alt="no content"
                className={"rounded-sm"}
                loading={index && index < 2 ? "eager" : "lazy"}
              />
            )}
          </Link>
        </div>
        <div className={"flex flex-col justify-center w-full"}>
          <Link to={`/${url}`}>
            <div id={"title-div"} className={"flex items-center"}>
              <span
                className={
                  "text-xl font-bold text-main-text-black dark:text-white-dark overflow-hidden text-ellipsis whitespace-nowrap"
                }
              >
                {book_name}
              </span>
            </div>
          </Link>

          <div
            className={
              "text-base md:text-md line-clamp-2 h-12 w-full my-2 text-gray dark:text-white-dark"
            }
          >
            {description}
          </div>

          <div className={"flex flex-col space-y-1"}>
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
      </div>
      <hr className={"my-5 border-gray-light"} />
    </>
  );
};

export default SummarizedBook;
