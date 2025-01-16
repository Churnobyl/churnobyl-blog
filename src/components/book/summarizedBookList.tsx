import React from "react";
import { IBook } from "../../interfaces/IBook";
import SummarizedBook from "./summarizedBook";

interface SummarizedBookListProps {
  data: IBook[];
  totalBooks: number;
}

const SummarizedBookList: React.FC<SummarizedBookListProps> = ({
  data,
  totalBooks,
}) => {
  return (
    <>
      <div className={"py-4"}>
        <div
          className={
            "text-xl font-bold border-b-2 border-gray-light dark:border-white-dark text-main-text-black dark:text-white-dark"
          }
        >
          <span>북</span>{" "}
          <span className={"text-base text-main-blue dark:text-sub-skyblue"}>
            {totalBooks}
          </span>
        </div>
      </div>
      {data.length !== 0 ? (
        data.map((book, index) => (
          <SummarizedBook key={book.id} data={book} index={index} />
        ))
      ) : (
        <div
          className={
            "flex justify-center items-center text-main-text-black dark:text-white-dark"
          }
        >
          <div className={"p-5"}>결과가 없습니다</div>
        </div>
      )}
    </>
  );
};

export default SummarizedBookList;
