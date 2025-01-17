import React, { useEffect, useRef, useMemo } from "react";
import { IBook } from "../../interfaces/IBook";
import PostCard from "./postCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "gatsby";

const BookSlider = ({
  book,
  currentBookIndex,
}: {
  book: IBook;
  currentBookIndex: number;
}) => {
  const swiperRef = useRef<any>(null);

  const sortedChildrenChurnotion = useMemo(() => {
    if (!book.childrenChurnotion || book.childrenChurnotion.length === 0) {
      return []; // childrenChurnotion이 없으면 빈 배열 반환
    }
    return [...book.childrenChurnotion].sort(
      (a, b) => a.book_index - b.book_index
    );
  }, [book.childrenChurnotion]);

  useEffect(() => {
    if (swiperRef.current && sortedChildrenChurnotion.length > 0) {
      const currentSlideIndex = sortedChildrenChurnotion.findIndex(
        (churnotion) => churnotion.book_index === currentBookIndex
      );

      if (currentSlideIndex !== -1) {
        swiperRef.current.slideTo(currentSlideIndex, 500);
      }
    }
  }, [currentBookIndex, sortedChildrenChurnotion]);

  return (
    <div
      id={"book-slider-container"}
      className={
        "flex flex-col w-full justify-center items-center space-y-4 max-w-[760px] my-4"
      }
    >
      <div
        className={
          "flex flex-col items-center justify-center md:flex-row w-full space-x-3"
        }
      >
        <div
          className={
            "text-2xl font-bold text-main-text-black dark:text-white-dark"
          }
        >
          이 책의 다른 글 보기
        </div>
        <Link to={`/${book.url}`}>
          <div
            className={"text-sm font-bold text-main-blue dark:text-sub-skyblue"}
          >
            {book.book_name}
          </div>
        </Link>
      </div>

      <div className={"w-full"}>
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Mousewheel,
            Keyboard,
          ]}
          slidesPerView={1}
          spaceBetween={0}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            800: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            // 화면 너비가 1024px 이상일 때
            1280: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          navigation
          mousewheel={{ enabled: true }}
          keyboard={{ enabled: true }}
          pagination={{ clickable: false }}
          scrollbar={{ draggable: true }}
          passiveListeners={false}
          a11y={{ enabled: true }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          centeredSlides={true}
        >
          {sortedChildrenChurnotion.length > 0 ? (
            sortedChildrenChurnotion.map((churnotion) => (
              <SwiperSlide key={churnotion.id} className={"mb-10"}>
                <PostCard
                  key={churnotion.id}
                  churnotion={churnotion}
                  isCurrent={churnotion.book_index === currentBookIndex}
                />
              </SwiperSlide>
            ))
          ) : (
            <p>관련 글이 없습니다.</p>
          )}
        </Swiper>
      </div>
      <hr className="" />
    </div>
  );
};

export default BookSlider;
