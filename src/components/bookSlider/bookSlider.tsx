import React from "react";
import LeftButton from "./leftButton";
import RightButton from "./rightButton";
import { IPost } from "../../interfaces/IPost";

const BookSlider = ({
  book,
  currentBookIndex,
}: {
  book: IPost;
  currentBookIndex: number;
}) => {
  return (
    <div
      id={"book-slider-container"}
      className={"flex justify-center items-center"}
    >
      <div>
        <LeftButton />
        <div id={"slider"} className={"flex flex-row space-x-2"}></div>
        <RightButton />
      </div>
    </div>
  );
};

export default BookSlider;
