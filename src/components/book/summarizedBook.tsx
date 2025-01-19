import { Link } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import React from "react";
import CalenderSvg from "../../images/calenderSvg";
import { IBook } from "../../interfaces/IBook";

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

  const image = getImage(book_image);

  return (
    <>
      {/* xl 이상에서는 기존 레이아웃 */}
      <div className="group flex justify-between items-center w-full mt-2 py-5 md-5 post-layout">
        <div
          className={
            "flex flex-col space-y-0 w-full justify-evenly xl:w-[600px] h-44"
          }
        >
          <Link to={`/${url}`}>
            <div id={"title-div"} className={"flex min-w-full items-center"}>
              <span
                className={
                  "text-base md:text-xl text-main-text-black dark:text-white-dark font-bold overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-main-blue group-hover:dark:text-sub-skyblue"
                }
              >
                {book_name}
              </span>
            </div>
            <div
              className={
                "text-xs md:text-sm line-clamp-3 h-12 my-2 w-full text-gray dark:text-white-dark"
              }
            >
              {description}
            </div>
          </Link>

          <div className={"flex flex-row items-center w-full"}>
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
        <div className="flex justify-end pl-2 w-[90px] sm:w-[130px] h-44 min-w-4 group-hover:scale-105 duration-200">
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
      </div>
    </>
  );
};

export default SummarizedBook;
