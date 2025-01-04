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

const BookSlider = ({
  book,
  currentBookIndex,
}: {
  book: IBook;
  currentBookIndex: number;
}) => {
  const swiperRef = useRef<any>(null);

  // childrenChurnotion을 book_index 기준으로 정렬
  const sortedChildrenChurnotion = useMemo(() => {
    return [...book.childrenChurnotion].sort(
      (a, b) => a.book_index - b.book_index
    );
  }, [book.childrenChurnotion]);

  useEffect(() => {
    if (swiperRef.current) {
      const currentSlideIndex = sortedChildrenChurnotion.findIndex(
        (churnotion) => churnotion.book_index === currentBookIndex
      );

      if (currentSlideIndex !== -1) {
        swiperRef.current.slideTo(
          currentSlideIndex !== 0 ? currentSlideIndex - 1 : 0,
          500
        );
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
        <div className={"text-2xl font-bold text-main-text-black"}>
          이 책의 다른 글 보기
        </div>
        <div className={"text-sm font-bold text-main-blue"}>
          {book.book_name}
        </div>
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
            360: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            800: {
              slidesPerView: 5,
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
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {sortedChildrenChurnotion.map((churnotion) => (
            <SwiperSlide key={churnotion.id} className={"mb-10"}>
              <PostCard
                key={churnotion.id}
                churnotion={churnotion}
                isCurrent={churnotion.book_index === currentBookIndex}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <hr className="" />
    </div>
  );
};

export default BookSlider;
