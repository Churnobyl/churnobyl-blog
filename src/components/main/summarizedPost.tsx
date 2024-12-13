import React from "react";
import { ISummarizedPost } from "../../interfaces/ISummarizedPost";
import Label from "../labels/label";
import { Link } from "gatsby";
import Tag from "../labels/tag";

const isWithinAWeek = (date: string): boolean => {
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const currentDate = new Date();
  const targetDate = new Date(date);
  return currentDate.getTime() - targetDate.getTime() <= oneWeekInMilliseconds;
};

const SummarizedPost: React.FC<ISummarizedPost> = ({
  id,
  title,
  description,
  categories,
  tags,
  created_date,
  updated_date,
  post_url,
}) => {
  const showNew = isWithinAWeek(created_date);
  const showUpdated = !showNew && isWithinAWeek(updated_date);

  return (
    <div className={"my-5 space-y-5"}>
      <div id={"title-div"} className={"flex items-center"}>
        <span
          className={
            "text-lg md:text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap"
          }
        >
          <Link to={post_url}>{title}</Link>
        </span>

        {showNew && <Label text="new" />}
        {showUpdated && <Label text="updated" />}
      </div>
      <div id={"category-div"}>
        {categories.map((category, index) => (
          <span key={index} className={"text-sm md:text-base text-gray"}>
            <Link
              to={`/categories/${encodeURIComponent(category.category_name)}`}
              title={`Explore posts in ${category.category_name}`}
            >
              {category.category_name}
            </Link>
            {index < categories.length - 1 && " - "}
          </span>
        ))}
        <span className={"text-xs md:text-sm px-3"}>· {created_date}</span>
      </div>
      <p className={"text-base md:text-lg"}>{description}</p>
      <div id={"tag-div"}>
        {tags.map((tag) => (
          <Tag tag_name={tag.tag_name} />
        ))}
      </div>
      <hr className={"my-5 border-gray-light"} />
    </div>
  );
};

export default SummarizedPost;
