"use client";
import React, { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import category1 from "../../../public/static/images/Image.png";
import articlePoster from "../../../public/static/images/recentarticlesimage.png";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const RecentArticles = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full md:space-y-7 space-y-3">
      {/* title */}
      <div className="w-full flex items-center justify-between gap-2">
        <p className="relative capitalize text-lg ml-3 font-semibold text-blackText">
          Recent articles
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
        slidesPerView={1}
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
      >
        <SwiperSlide className="w-full group overflow-hidden">
          <div className="w-full space-y-3 relative rounded-lg">
            <Image
              src={category1}
              alt=""
              height={500}
              width={500}
              className="w-full transition-all group-hover:scale-110 duration-300 ease-in-out object-cover lg:h-[60vh] h-[40vh]"
            />
            <div className="w-full z-10 absolute bottom-3  text-white md:left-4 left-2 capitalize">
              <p className="font-semibold mb-2 lg:text-4xl md:text-2xl text-lg">
                Bathroom floor coverings from MEISTER
              </p>
              <p className="font-light text-sm">CARPENTRY | OCTOBER 16, 2023</p>
            </div>
            <p className="bg-black/20 w-full bottom-0 transition-all duration-300 ease-in-out lg:group-hover:h-1/4 group-hover:h-1/3 h-0 left-0 z-0 absolute"></p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-full">
          <div className="w-full space-y-3 relative rounded-lg">
            <Image
              src={category1}
              alt=""
              height={500}
              width={500}
              className="w-full object-cover lg:h-[60vh] h-[40vh]"
            />
            <div className="w-full absolute bottom-3  text-white md:left-4 left-2 capitalize">
              <p className="font-semibold mb-2 lg:text-4xl md:text-2xl text-lg">
                Bathroom floor coverings from MEISTER
              </p>
              <p className="font-light text-sm">CARPENTRY | OCTOBER 16, 2023</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* other articles */}
      <div className="w-full grid xl:grid-cols-3 md:grid-cols-2 place-items-start items-start md:gap-5 gap-3">
        <div className="w-full flex items-start gap-2">
          <Image
            src={category1}
            alt=""
            height={200}
            width={200}
            className="xl:w-[8vw] md:w-[15vw] w-[25vw] h-fit object-cover object-center"
          />
          <div className="space-y-2">
            <p className="font-semibold xl:text-lg text-blackText">
              Amanda Seyfried became ‘really obsessed’ with ghost stories
            </p>
            <p className="text-blackText font-medium">
              Craig Bator -{" "}
              <span className="text-grayText font-light text-sm">
                27 Dec 2024
              </span>
            </p>
          </div>
        </div>
        <div className="w-full flex items-start gap-2">
          <Image
            src={category1}
            alt=""
            height={200}
            width={200}
            className="xl:w-[8vw] md:w-[15vw] w-[25vw] h-fit object-cover object-center"
          />
          <div className="space-y-2">
            <p className="font-semibold xl:text-lg text-blackText">
              Amanda Seyfried became ‘really obsessed’ with ghost stories
            </p>
            <p className="text-blackText font-medium">
              Craig Bator -{" "}
              <span className="text-grayText font-light text-sm">
                27 Dec 2024
              </span>
            </p>
          </div>
        </div>
        <div className="w-full flex items-start gap-2">
          <Image
            src={category1}
            alt=""
            height={200}
            width={200}
            className="xl:w-[8vw] md:w-[15vw] w-[25vw] h-fit object-cover object-center"
          />
          <div className="space-y-2">
            <p className="font-semibold xl:text-lg text-blackText">
              Amanda Seyfried became ‘really obsessed’ with ghost stories
            </p>
            <p className="text-blackText font-medium">
              Craig Bator -{" "}
              <span className="text-grayText font-light text-sm">
                27 Dec 2024
              </span>
            </p>
          </div>
        </div>
        <div className="w-full flex items-start gap-2">
          <Image
            src={category1}
            alt=""
            height={200}
            width={200}
            className="xl:w-[8vw] md:w-[15vw] w-[25vw] h-fit object-cover object-center"
          />
          <div className="space-y-2">
            <p className="font-semibold xl:text-lg text-blackText">
              Amanda Seyfried became ‘really obsessed’ with ghost stories
            </p>
            <p className="text-blackText font-medium">
              Craig Bator -{" "}
              <span className="text-grayText font-light text-sm">
                27 Dec 2024
              </span>
            </p>
          </div>
        </div>
        <div className="w-full flex items-start gap-2">
          <Image
            src={category1}
            alt=""
            height={200}
            width={200}
            className="xl:w-[8vw] md:w-[15vw] w-[25vw] h-fit object-cover object-center"
          />
          <div className="space-y-2">
            <p className="font-semibold xl:text-lg text-blackText">
              Amanda Seyfried became ‘really obsessed’ with ghost stories
            </p>
            <p className="text-blackText font-medium">
              Craig Bator -{" "}
              <span className="text-grayText font-light text-sm">
                27 Dec 2024
              </span>
            </p>
          </div>
        </div>
        <div className="w-full flex items-start gap-2">
          <Image
            src={category1}
            alt=""
            height={200}
            width={200}
            className="xl:w-[8vw] md:w-[15vw] w-[25vw] h-fit object-cover object-center"
          />
          <div className="space-y-2">
            <p className="font-semibold xl:text-lg text-blackText">
              Amanda Seyfried became ‘really obsessed’ with ghost stories
            </p>
            <p className="text-blackText font-medium">
              Craig Bator -{" "}
              <span className="text-grayText font-light text-sm">
                27 Dec 2024
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* image */}
      <Image
        src={articlePoster}
        alt="poster_artisans_bois"
        className="w-full h-fit md:pt-10 pt-5 object-cover object-center"
      />
    </div>
  );
};

export default RecentArticles;
