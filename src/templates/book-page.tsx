import { Link, type PageProps } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import SummarizedBookContents from "../components/book/summarizedBookContents";
import TagList from "../components/labels/tagList";
import NormalLayout from "../components/layout/normalLayout";
import { SEO } from "../components/seo/seo";
import { IBookCategory } from "../interfaces/IBookCategory";
import { IPost } from "../interfaces/IPost";
import { ITag } from "../interfaces/ISummarizedPost";

interface BookPageContext {
  bookName: string;
  bookImage: IGatsbyImageData;
  createDate: string;
  updateDate: string;
  posts: IPost[];
  description: string;
  bookCategory: IBookCategory;
  url: string;
  bookTagList: ITag[];
}

const BookPage: React.FC<PageProps<{}, BookPageContext>> = ({
  pageContext,
}) => {
  const {
    bookName,
    bookImage,
    createDate,
    updateDate,
    posts,
    description,
    bookCategory,
    bookTagList,
  } = pageContext;

  return (
    <NormalLayout>
      <div className="flex flex-col items-center justify-center w-full">
        {/* 상단 책 정보 */}
        <div className="flex flex-col items-center mt-10 space-y-2">
          <Link to={`/${bookCategory.url}`}>
            <div
              className={"fold-bold text-gray dark:text-white-dark text-center"}
            >
              {bookCategory.category_name}
            </div>
          </Link>
          <div className="text-3xl font-bold text-center text-main-text-black dark:text-white-dark">
            {bookName}
          </div>
          <GatsbyImage
            image={getImage(bookImage)!}
            alt={bookName}
            className="mt-5 rounded-md w-3/5 md:w-56"
          />
          <div
            className={"flex flex-col items-center justify-center space-y-4"}
          >
            <div className="mt-3 text-sm text-gray dark:text-white-dark">
              <span>Created: {createDate}</span> |{" "}
              <span>Updated: {updateDate}</span>
            </div>
            <div className={"text-gray dark:text-white-dark"}>
              {description}
            </div>
          </div>
          <div className={"flex items-center justify-center"}>
            <TagList tags={bookTagList} isHorizontal={false} isShowAll={true} />
          </div>
        </div>

        {/* 하단 포스트 목록 */}
        <div className="mt-10 w-full max-w-4xl">
          <div className="text-2xl font-bold mb-5 text-main-text-black dark:text-white-dark">
            목차
          </div>
          <div className="space-y-5">
            {posts?.map((post) => (
              <SummarizedBookContents key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </NormalLayout>
  );
};

export default BookPage;

export const Head = ({ pageContext }: PageProps<{}, BookPageContext>) => {
  const { bookName, description, url, bookImage } = pageContext;
  return (
    <SEO
      title={bookName}
      description={description}
      pathname={`/${url}`}
      image={bookImage}
    />
  );
};
