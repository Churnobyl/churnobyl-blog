import React from "react";
import NormalLayout from "../components/layout/normalLayout";
import { IPost } from "../interfaces/IPost";
import { graphql, PageProps } from "gatsby";
import Category from "../components/category/category";
import TagList from "../components/labels/tagList";
import { useFormatDate } from "../hooks/use-format-date";

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
  } = data.churnotion;
  const { pageId } = pageContext;
  return (
    <NormalLayout>
      <div className="grid grid-cols-5 gap-4 my-40 w-full mx-auto">
        <div className="col-span-1"></div>

        <div className="col-span-3 flex flex-col space-y-5">
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
          <div>{JSON.stringify(content)}</div>
        </div>

        <div className="col-span-1">
          <div className="sticky top-10">여긴 목차가 들어갈 거임</div>
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
    }
  }
`;

export default PostTemplate;
