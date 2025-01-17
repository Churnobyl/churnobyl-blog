// import React, { useState, useEffect } from "react";
// import { IBooks } from "../../interfaces/IBook";
// import { Link } from "gatsby";

// interface IBookList {
//   data: IBooks[];
// }

// const BookList: React.FC<IBookList> = ({ data }) => {
//   const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
//   const [updatedCategories, setUpdatedCategories] = useState<{
//     [key: string]: { yellowDot: boolean; blueDot: boolean };
//   }>({});

//   useEffect(() => {
//     const categoryStatus: {
//       [key: string]: { yellowDot: boolean; blueDot: boolean };
//     } = {};
//     data.forEach((category) => {
//       const showYellowDot =
//         category.childrenNBook.some((book) =>
//           isWithinAWeek(book.create_date)
//         ) ||
//         category.childrenNBook.some((book) => isWithinAWeek(book.update_date));

//       const showBlueDot =
//         !showYellowDot &&
//         category.childrenNBook.some((book) => isWithinAWeek(book.update_date));

//       categoryStatus[category.id] = {
//         yellowDot: showYellowDot,
//         blueDot: showBlueDot,
//       };
//     });
//     setUpdatedCategories(categoryStatus);
//   }, [data]);

//   const isWithinAWeek = (date: string): boolean => {
//     const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
//     const currentDate = new Date();
//     const targetDate = new Date(date);
//     return (
//       currentDate.getTime() - targetDate.getTime() <= oneWeekInMilliseconds
//     );
//   };

//   const toggleCategory = (book: string) => {
//     setExpandedCategory((prev) => (prev === book ? null : book));
//   };

//   return (
//     <div className="flex flex-col items-start w-full max-w-md px-4">
//       <div className={"py-5"}>
//         <h1 className={"text-xl font-bold"}>북</h1>
//       </div>
//       <div id={"book-list"} className="w-full">
//         {data.map((category) => {
//           const { yellowDot, blueDot } = updatedCategories[category.id] || {
//             yellowDot: false,
//             blueDot: false,
//           };

//           return (
//             <div key={category.id} className="mb-4 pb-2 w-full">
//               <div
//                 className="cursor-pointer text-lg font-semibold text-black flex items-center"
//                 onClick={() => toggleCategory(category.id)}
//               >
//                 {category.category_name}
//                 {yellowDot && (
//                   <span className="ml-2 w-2 h-2 bg-highlight-yellow rounded-full"></span>
//                 )}
//                 {!yellowDot && blueDot && (
//                   <span className="ml-2 w-2 h-2 bg-sub-lightskyblue rounded-full"></span>
//                 )}
//               </div>
//               {/* Books List */}
//               {expandedCategory === category.id && (
//                 <ul className="mt-2 ml-5 list-item w-full">
//                   {category.childrenNBook
//                     .sort(
//                       (a, b) =>
//                         new Date(b.update_date).getTime() -
//                         new Date(a.update_date).getTime()
//                     )
//                     .map((book, index) => {
//                       const showBookYellowDot = isWithinAWeek(book.create_date);
//                       const showBookBlueDot =
//                         !showBookYellowDot && isWithinAWeek(book.update_date);

//                       return (
//                         <li key={index} className="flex items-center">
//                           <Link to={`/${book.url}`} className={"text-sm"}>
//                             {book.book_name}
//                           </Link>
//                           {showBookYellowDot && (
//                             <span className="ml-2 w-2 h-2 bg-highlight-yellow rounded-full"></span>
//                           )}
//                           {!showBookYellowDot && showBookBlueDot && (
//                             <span className="ml-2 w-2 h-2 bg-sub-lightskyblue rounded-full"></span>
//                           )}
//                         </li>
//                       );
//                     })}
//                 </ul>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BookList;
