import { graphql, PageProps } from "gatsby";
import React from "react";
import Category from "../components/category/category";
import CommentUtterances from "../components/comments/commentUtterances";
import PostInteractions from "../components/interaction/postInteraction";
import TagList from "../components/labels/tagList";
import NormalLayout from "../components/layout/normalLayout";
import { SEO } from "../components/seo/seo";
import TableOfContents from "../components/tableOfContents/tableOfContents";
import { useFormatDate } from "../hooks/use-format-date";
import { IPost } from "../interfaces/IPost";
import MdxGenerator from "../mdx/mdxGenerator";
import BookSlider from "../components/bookSlider/bookSlider";
import { GatsbyImage } from "gatsby-plugin-image";

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
    thumbnail,
  } = data.churnotion;
  const { pageId } = pageContext;

  const convertedCreateDate = useFormatDate(create_date);

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
            <div className={"flex flex-row justify-between h-24"}>
              <div className="flex flex-col justify-between h-full">
                <div>{convertedCreateDate}</div>
                <div>
                  <Category category_list={category_list} />
                </div>
                <div>
                  <TagList tags={tags} />
                </div>
              </div>
              <div>
                {book && (
                  <GatsbyImage
                    image={
                      book.book_image.childrenImageSharp?.[0]?.gatsbyImageData
                    }
                    alt={""}
                  />
                )}
              </div>
            </div>
          </div>
          <hr />
          <div>
            <MdxGenerator content={content} />
          </div>
          <hr />
          <div>
            <CommentUtterances />
          </div>
        </div>

        <div className="hidden xl:block sticky top-20 h-[calc(100vh-40px)] overflow-auto w-[300px] ml-10">
          <div>
            <PostInteractions slug={url} />
          </div>
          <TableOfContents tableOfContents={tableOfContents} />
        </div>
      </div>
      <div className="flex flex-col justify-center my-20 w-full mx-auto">
        <BookSlider book={book} currentBookIndex={book_index} />
        {/* <RelatedPost /> */}
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
        id
        url
        book_image {
          childrenImageSharp {
            gatsbyImageData(aspectRatio: 0.7, width: 70)
          }
        }
      }
      book_index
      tableOfContents
      thumbnail {
        childImageSharp {
          gatsbyImageData(
            sizes: "200"
            placeholder: BLURRED
            quality: 5
            height: 400
            width: 800
            layout: CONSTRAINED
          )
        }
      }
    }
  }
`;

export default PostTemplate;

export const Head = ({ data }: PageProps<IPost, PostPageContext>) => {
  const { title, description, url, thumbnail } = data.churnotion;

  return (
    <SEO
      title={title}
      description={description}
      pathname={url}
      image={thumbnail?.childImageSharp?.gatsbyImageData}
    />
  );
};
