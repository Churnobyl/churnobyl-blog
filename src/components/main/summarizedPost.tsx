import React from "react";
import { ISummarizedPost } from "../../interfaces/ISummarizedPost";
import Label from "../labels/label";
import { Link } from "gatsby";
import TagList from "../labels/tagList";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import Category from "../category/category";
import { useFormatDate } from "../../hooks/use-format-date";
import CalenderSvg from "../../images/calenderSvg";

const isWithinAWeek = (value: string): boolean => {
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const currentDate = new Date();
  const targetDate = new Date(value);
  return currentDate.getTime() - targetDate.getTime() <= oneWeekInMilliseconds;
};

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
}) => {
  const showNew = isWithinAWeek(create_date);
  const showUpdated = !showNew && isWithinAWeek(update_date);

  const convertedCreateDate = useFormatDate(create_date);
  const convertedUpdateDate = useFormatDate(update_date);
  const image = getImage(thumbnail);

  return (
    <div>
      {/* xl 이상에서는 기존 레이아웃 */}
      <div className="hidden lg:flex flex-row space-x-20 items-center w-full my-10">
        <div className="flex justify-end items-center w-[208px] h-36 min-w-40 max-w-xs">
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
          className={"flex flex-col justify-evenly space-y-0 w-[600px] h-36"}
        >
          <div id={"title-div"} className={"flex items-center"}>
            <span
              className={
                "text-lg md:text-xl text-main-text-black font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:text-gray"
              }
            >
              <Link to={`/${url}`}>{title}</Link>
            </span>

            {/* {showNew && <Label text="new" />}
            {showUpdated && <Label text="updated" />} */}
          </div>
          <div
            className={
              "text-base md:text-md line-clamp-2 h-12 w-full text-gray"
            }
          >
            {description}
          </div>
          <Category category_list={category_list} />

          <div className={"flex flex-row items-center"}>
            <TagList tags={tags} />
            <div className={"flex flex-row space-x-1 items-center"}>
              <CalenderSvg />
              <div className={"flex text-xs md:text-sm text-gray"}>
                {convertedCreateDate}
              </div>
              <div className={"flex text-xs md:text-sm text-gray"}>
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
                "text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap"
              }
            >
              <Link to={`/${url}`}>{title}</Link>
            </span>

            {/* {showNew && <Label text="new" />}
              {showUpdated && <Label text="updated" />} */}
          </div>

          <div
            className={
              "text-base md:text-md line-clamp-2 h-12 w-full text-gray"
            }
          >
            {description}
          </div>
          <div className={"flex flex-col space-y-1"}>
            <Category category_list={category_list} />
            <TagList tags={tags} />
            <div className={"flex flex-row space-x-1 items-center"}>
              <CalenderSvg />
              <div className={"flex text-xs md:text-sm text-gray"}>
                {convertedCreateDate}
              </div>
              <div className={"flex text-xs md:text-sm text-gray"}>
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

export default SummarizedPost;
