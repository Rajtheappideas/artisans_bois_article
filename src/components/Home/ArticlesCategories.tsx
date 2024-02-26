"use client";
import React, { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import category1 from "../../../public/static/images/unsplash_-js8KGQLfhw.jpg";
import category2 from "../../../public/static/images/unsplash_DGHy9KgdTj0.png";
import category3 from "../../../public/static/images/unsplash_mP7aPSUm7aE.png";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SingalCategory from "./SingalCategory";

const ArticlesCategories = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full">
      {/* title */}
      <div className="w-full flex items-center justify-between gap-2">
        <p className="relative text-lg ml-3 font-semibold text-blackText">
          Articles Categories
          <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
        </p>
        {/* arrows */}
        <div className="flex items-center gap-1">
          <button ref={prevRef} name="previous" className="h-7 w-7">
            <AiOutlineLeft className="bg-gray-200 hover:bg-gray-300 rounded-lg text-black p-2 h-7 w-7" />
          </button>
          <button ref={nextRef} name="next" className="h-7 w-7">
            <AiOutlineRight className="bg-gray-200 hover:bg-gray-300 rounded-lg text-black p-2 h-7 w-7" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        direction={"horizontal"}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
          enabled: true,
        }}
        loop={true}
        observer={true}
        parallax={true}
        observeParents={true}
        onSwiper={(swiper: any) => {
          // Delay execution for the refs to be defined
          setTimeout(() => {
            // Override prevEl & nextEl now that refs are defined
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;

            // Re-init navigation
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
        breakpoints={{
          1280: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
          240: {
            slidesPerView: 1,
          },
        }}
      >
        <SwiperSlide className="w-full py-2 pl-2 overflow-hidden">
          <SingalCategory image={category1} name="Outdoor Facilities" />
        </SwiperSlide>
        <SwiperSlide className="w-full py-2 pl-2">
          <SingalCategory image={category2} name="Outdoor Facilities" />
        </SwiperSlide>
        <SwiperSlide className="w-full py-2 pl-2">
          <SingalCategory image={category3} name="Outdoor Facilities" />
        </SwiperSlide>
        <SwiperSlide className="w-full py-2 pl-2">
          <SingalCategory image={category1} name="Outdoor Facilities" />
        </SwiperSlide>
        <SwiperSlide className="w-full py-2 pl-2">
          <SingalCategory image={category2} name="Outdoor Facilities" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ArticlesCategories;
