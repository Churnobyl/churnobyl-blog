import React from "react";
import { ISummarizedPost } from "../../interfaces/ISummarizedPost";
import Label from "../labels/label";
import { Link } from "gatsby";
import Tag from "../labels/tag";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import Category from "../category/category";
import TagList from "../labels/tagList";
import { useFormatDate } from "../../hooks/use-format-date";

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
  const image = getImage(thumbnail);

  return (
    <>
      <div className={"flex flex-row space-x-5 items-center w-full"}>
        <div className="flex justify-end items-center w-[208px] h-52 min-w-40 max-w-xs">
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
          className={"flex flex-col justify-evenly space-y-2 w-[600px] h-52"}
        >
          <div id={"title-div"} className={"flex items-center"}>
            <span
              className={
                "text-lg md:text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap"
              }
            >
              <Link to={`/${url}`}>{title}</Link>
            </span>

            {showNew && <Label text="new" />}
            {showUpdated && <Label text="updated" />}
          </div>
          <div id={"category-div"}>
            <Category category_list={category_list} />
            <span className={"text-xs md:text-sm px-3"}>
              · {convertedCreateDate}
            </span>
          </div>
          <p
            className={
              "text-base md:text-md text-ellipsis overflow-hidden h-20 w-full"
            }
          >
            {description}
          </p>
          <div id={"tag-div"}>
            <TagList tags={tags} />
          </div>
        </div>
      </div>
      <hr className={"my-5 border-gray-light"} />
    </>
  );
};

export default SummarizedPost;
