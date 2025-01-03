import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import TagList from "../components/labels/tagList";
import Category from "../components/category/category";
import { useFormatDate } from "../hooks/use-format-date";
import { IPost, IPostContent } from "../interfaces/IPost";

const PostTitleSet = ({
  title,
  version,
  create_date,
  update_date,
  category_list,
  tags,
  book,
  book_index,
}: IPostContent) => {
  const convertedCreateDate = useFormatDate(create_date);

  console.log(book);

  return (
    <div id="content_head" className="flex flex-col space-y-5">
      <div className={"space-x-2"}>
        <span className={"text-3xl font-bold"}>{title}</span>
        <span className={"text-main-blue text-sm"}>
          v{version} 개정 {useFormatDate(update_date)}
        </span>
      </div>
      <div className={"flex flex-row justify-between h-24"}>
        <div className="flex flex-col justify-between space-y-2">
          <div className={"text-gray-dark"}>{convertedCreateDate}</div>
          <div>
            <Category category_list={category_list} />
          </div>
          <div>
            <TagList tags={tags} />
          </div>
        </div>
        <div className={"flex justify-end h-24 w-auto"}>
          {book && (
            <div className={"flex w-auto"}>
              <GatsbyImage
                image={
                  book.book_image?.childrenImageSharp?.[0]?.gatsbyImageData
                }
                alt={book.book_name || "책 이미지"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostTitleSet;
