import React, { useState } from "react";
import { IBookCategory } from "../../interfaces/IBook";
import { Link } from "gatsby";

interface IBookList {
  data: IBookCategory[];
}

const isWithinAWeek = (date: string): boolean => {
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const currentDate = new Date();
  const targetDate = new Date(date);
  return currentDate.getTime() - targetDate.getTime() <= oneWeekInMilliseconds;
};

const BookList: React.FC<IBookList> = ({ data }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="flex flex-col items-start w-full max-w-md px-4">
      <div className={"py-5"}>
        <h1 className={"text-xl font-bold"}>북</h1>
      </div>
      <div id={"book-list"} className="w-full">
        {data.map((category) => {
          // Check category-level dots (first book's created_date and updated_date)
          const showYellowDot = category.books.some((book) =>
            isWithinAWeek(book.created_date)
          );
          const showBlueDot =
            !showYellowDot &&
            category.books.some((book) => isWithinAWeek(book.updated_date));

          return (
            <div key={category.category} className="mb-4 pb-2 w-full">
              {/* Category Header */}
              <div
                className="cursor-pointer text-lg font-semibold text-black flex items-center"
                onClick={() => toggleCategory(category.category)}
              >
                {category.category}
                {showYellowDot && (
                  <span className="ml-2 w-2 h-2 bg-highlight-yellow rounded-full"></span>
                )}
                {!showYellowDot && showBlueDot && (
                  <span className="ml-2 w-2 h-2 bg-sub-lightskyblue rounded-full"></span>
                )}
              </div>
              {/* Books List */}
              {expandedCategory === category.category && (
                <ul className="mt-2 ml-5 list-item w-full">
                  {category.books.map((book, index) => {
                    const showBookYellowDot = isWithinAWeek(book.created_date);
                    const showBookBlueDot =
                      !showBookYellowDot && isWithinAWeek(book.updated_date);

                    return (
                      <li key={index} className="flex items-center">
                        <Link to={book.url} className={"text-sm"}>
                          {book.book_name}
                        </Link>
                        {showBookYellowDot && (
                          <span className="ml-2 w-2 h-2 bg-highlight-yellow rounded-full"></span>
                        )}
                        {!showBookYellowDot && showBookBlueDot && (
                          <span className="ml-2 w-2 h-2 bg-sub-lightskyblue rounded-full"></span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookList;
