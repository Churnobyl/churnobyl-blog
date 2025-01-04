import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import TagList from "../labels/tagList";
import Category from "../category/category";
import { useFormatDate } from "../../hooks/use-format-date";
import { IPostContent } from "../../interfaces/IPost";

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
        <div className="text-xl font-bold xl:text-3xl">{title}</div>
        <div className="text-main-blue text-sm">
          v{version} 개정 {convertedUpdateDate}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-2">
          <div className="text-gray-dark text-sm xl:text-base">
            {convertedCreateDate}
          </div>
          <Category category_list={category_list} />
          <TagList tags={tags} />
        </div>
        {book && (
          <div className="flex-shrink-0">
            <GatsbyImage
              image={book.book_image?.childrenImageSharp?.[0]?.gatsbyImageData}
              alt={book.book_name || "책 이미지"}
              className="w-16 h-24 object-cover"
            />
          </div>
        )}
      </div>

      <hr className="border-t border-gray-light w-full mt-4" />
    </div>
  );
};

export default PostTitleSet;
