import React from "react";
import { IBook } from "../../interfaces/IBook";
import SummarizedBook from "./summarizedBook";

interface SummarizedBookListProps {
  data: IBook[];
}

const SummarizedBookList: React.FC<SummarizedBookListProps> = ({ data }) => {
  return (
    <>
      <div className={"py-4"}>
        <h1
          className={
            "text-xl font-bold border-b-2 border-gray-light dark:border-white-dark text-main-text-black dark:text-white-dark"
          }
        >
          북
        </h1>
        {data.length !== 0 ? (
          data.map((book, index) => (
            <SummarizedBook key={book.id} data={book} index={index} />
          ))
        ) : (
          <div className={"flex justify-center items-center"}>
            <div className={"p-5"}>결과가 없습니다</div>
          </div>
        )}
      </div>
    </>
  );
};

export default SummarizedBookList;
