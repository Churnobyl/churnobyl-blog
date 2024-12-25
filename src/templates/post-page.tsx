import { graphql, PageProps } from "gatsby";
import React, { useEffect } from "react";
import Category from "../components/category/category";
import TagList from "../components/labels/tagList";
import NormalLayout from "../components/layout/normalLayout";
import { useFormatDate } from "../hooks/use-format-date";
import { IPost } from "../interfaces/IPost";
import MdxGenerator from "../mdx/mdxGenerator";

const scrollToWithOffset = (hash: string, offset: number) => {
  const target = document.getElementById(hash);
  if (target) {
    const y = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

interface PostPageContext {
  pageId: string;
}

const PostTemplate: React.FC<PageProps<IPost, PostPageContext>> = ({
  data,
  pageContext,
}) => {
  const {
    title,
    book,
    book_index,
    category_list,
    content,
    create_date,
    description,
    id,
    tags,
    update_date,
    url,
    version,
    tableOfContents,
  } = data.churnotion;
  const { pageId } = pageContext;
  return (
    <NormalLayout>
      <div className="flex justify-center my-40 w-full mx-auto">
        <div className="w-[800px] flex flex-col space-y-5">
          <div id="content_head" className="flex flex-col space-y-5">
            <div className={"space-x-2"}>
              <span className={"text-3xl font-bold"}>{title}</span>
              <span className={"text-main-blue text-sm"}>
                v{version} 개정 {useFormatDate(update_date)}
              </span>
            </div>
            <div>
              <span>
                {book?.book_name}
                {book_index}
              </span>
              <span>{create_date}</span>
            </div>
            <div>
              <Category category_list={category_list} />
            </div>
            <div>
              <TagList tags={tags} />
            </div>
          </div>
          <hr />
          <div>
            <MdxGenerator content={content} />
          </div>
        </div>

        <div className="hidden xl:block sticky top-20 h-[calc(100vh-40px)] overflow-auto w-[300px] ml-10">
          <div>
            <ul className="space-y-2 mt-4">
              {tableOfContents.map((item, index) => {
                const textSize =
                  item.type === "heading_1"
                    ? "text-lg font-bold"
                    : item.type === "heading_2"
                    ? "text-md font-medium"
                    : "text-base font-normal";

                const marginLeft =
                  item.type === "heading_1"
                    ? "ml-0"
                    : item.type === "heading_2"
                    ? "ml-4"
                    : "ml-8";

                return (
                  <li key={index} className={`${marginLeft}`}>
                    <a
                      href={`#${item.hash}`}
                      className={`text-main-blue hover:underline ${textSize}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToWithOffset(item.hash, -80);
                      }}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </NormalLayout>
  );
};

export const postQuery = graphql`
  query postQuery($pageId: String!) {
    churnotion(id: { eq: $pageId }) {
      id
      title
      update_date
      description
      create_date
      content
      category_list {
        category_name
        id
        url
      }
      tags {
        id
        color
        tag_name
        url
        slug
      }
      url
      version
      book {
        book_name
      }
      book_index
      tableOfContents
    }
  }
`;

export default PostTemplate;
