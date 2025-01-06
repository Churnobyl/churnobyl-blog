import { Link, type PageProps } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import SummarizedBook from "../components/book/summarizedBook";
import NormalLayout from "../components/layout/normalLayout";
import { SEO } from "../components/seo/seo";
import { useFormatDate } from "../hooks/use-format-date";
import { IPost } from "../interfaces/IPost";
import { IBookCategory } from "../interfaces/IBookCategory";

interface BookPageContext {
  bookName: string;
  bookImage: IGatsbyImageData;
  createDate: string;
  updateDate: string;
  posts: IPost[];
  description: string;
  bookCategory: IBookCategory;
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
  } = pageContext;

  return (
    <NormalLayout>
      <div className="flex flex-col items-center justify-center w-full">
        {/* 상단 책 정보 */}
        <div className="flex flex-col items-center mt-10 space-y-2">
          <Link to={`/${bookCategory.url}`}>
            <div className={"fold-bold text-gray text-center"}>
              {bookCategory.category_name}
            </div>
          </Link>
          <div className="text-3xl font-bold text-center text-main-text-black dark:text-white-dark">
            {bookName}
          </div>
          <GatsbyImage
            image={getImage(bookImage)!}
            alt={bookName}
            className="mt-5 rounded-md"
          />
          <div
            className={"flex flex-col items-center justify-center space-y-4"}
          >
            <div className="mt-3 text-sm text-gray">
              <span>Created: {useFormatDate(createDate)}</span> |{" "}
              <span>Updated: {useFormatDate(updateDate)}</span>
            </div>
            <div className={"text-gray"}>{description}</div>
          </div>
        </div>

        {/* 하단 포스트 목록 */}
        <div className="mt-10 w-full max-w-4xl">
          <div className="text-2xl font-bold mb-5 text-main-text-black dark:text-white-dark">
            목차
          </div>
          <div className="space-y-5">
            {posts.map((post) => (
              <SummarizedBook key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </NormalLayout>
  );
};

export default BookPage;

export const Head = ({ pageContext }: PageProps<{}, BookPageContext>) => {
  const { bookName } = pageContext;
  return (
    <SEO title={`Book: ${bookName}`} description={`Posts in ${bookName}`} />
  );
};
