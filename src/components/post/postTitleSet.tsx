import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import TagList from "../labels/tagList";
import Category from "../category/category";
import { useFormatDate } from "../../hooks/use-format-date";
import { IPostContent } from "../../interfaces/IPost";
import CalenderSvg from "../../images/calenderSvg";
import { Link } from "gatsby";

const PostTitleSet = ({
  title,
  version,
  create_date,
  update_date,
  category_list,
  tags,
  book,
}: IPostContent) => {
  const convertedCreateDate = useFormatDate(create_date);
  const convertedUpdateDate = useFormatDate(update_date);

  return (
    <div id="content_head" className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-2 xl:flex-row xl:items-center xl:space-x-2">
        <div className="text-xl text-main-text-black dark:text-white-dark font-bold xl:text-3xl">
          {title}
        </div>
        <div className="text-main-blue text-sm">
          v{version} 개정 {convertedUpdateDate}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-2">
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
        {book && (
          <div className="flex-shrink-0">
            <Link to={"/" + book.url}>
              <GatsbyImage
                image={
                  book.book_image?.childrenImageSharp?.[0]?.gatsbyImageData
                }
                alt={book.book_name || "책 이미지"}
                className="w-16 h-24 object-cover"
              />
            </Link>
          </div>
        )}
      </div>

      <hr className="border-t border-gray-light w-full mt-4" />
    </div>
  );
};

export default PostTitleSet;
