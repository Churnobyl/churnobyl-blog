import { type PageProps } from "gatsby";
import * as React from "react";
import { sample_book_data, sample_data } from "../api";
import NormalLayout from "../components/layout/normalLayout";
import BookList from "../components/main/bookList";
import SummarizedPostList from "../components/main/summarizedPostList";

const IndexPage: React.FC<PageProps> = ({ data }) => {
  return (
    <NormalLayout>
      <main>
        <div
          id={"content"}
          className={"my-10 flex items-center justify-center w-full"}
        >
          <div className={"flex justify-between w-2/3"}>
            <div className="flex-1 px-4 w-3/4">
              <SummarizedPostList data={sample_data} />
            </div>
            <div className="flex-4 px-4 w-1/4">
              <BookList data={sample_book_data} />
            </div>
          </div>
        </div>
      </main>
    </NormalLayout>
  );
};

export default IndexPage;
