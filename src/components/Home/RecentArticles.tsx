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
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import BaseUrl from "@/BaseUrl";
import moment from "moment";

const RecentArticles = () => {
  const { articleLoading, articles, homePageLoading, homePageContent } =
    useAppSelector((s) => s.root.getcontent);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full md:space-y-7 space-y-3">
      {/* title */}
      {articleLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="w-full flex items-center justify-between gap-2">
            <p className="relative capitalize text-lg ml-3 font-semibold text-blackText">
              Recent articles
              <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
            </p>
            {/* arrows */}
            <div className="flex items-center gap-1">
              <button
                ref={prevRef}
                name="recent_article_previous"
                className="h-7 w-7"
              >
                <AiOutlineLeft className="bg-gray-200 hover:bg-gray-300 rounded-lg text-black p-2 h-7 w-7" />
              </button>
              <button
                ref={nextRef}
                name="recent_article_next"
                className="h-7 w-7"
              >
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
            className="2xl:h-[40vh] h-[50vh]"
          >
            {articles.map(
              ({ _id, slug, category, createdAt, title, image }) => (
                <SwiperSlide
                  key={_id}
                  className="w-full  h-full group overflow-hidden"
                >
                  <Link href={`/articles/${slug}`} className="w-full h-full">
                    <div className="w-full space-y-3 h-full relative rounded-lg overflow-hidden">
                      <Image
                        src={BaseUrl.concat(image)}
                        alt=""
                        loading="lazy"
                        className="w-full h-full transition-all group-hover:scale-110 duration-300 ease-in-out object-cover"
                        fill
                      />
                      <div className="w-full z-10 absolute bottom-6 text-white md:left-4 left-2 capitalize">
                        <p className="font-semibold mb-2 lg:text-4xl md:text-2xl text-lg">
                          {title}
                        </p>
                        <p className="font-light text-sm">
                          {category} | {moment(createdAt).format("LL")}
                        </p>
                      </div>
                      <p className="bg-black/20 w-full bottom-0 transition-all duration-300 ease-in-out 2xl:group-hover:h-1/4 group-hover:h-1/3 h-0 left-0 z-0 absolute"></p>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            )}
          </Swiper>
          {/* other articles */}
          <div
            className={`w-full grid xl:grid-cols-${Math.round(
              articles.length / 3
            )} md:grid-cols-2 place-items-start items-start md:gap-x-10 md:gap-y-5 gap-3`}
          >
            {articles.map(({ _id, image, title, createdAt, category }) => (
              <div key={_id} className="w-full flex items-start gap-2">
                  <Image
                    src={BaseUrl.concat(image)}
                    alt=""
                    width={1000}
                    height={1000}
                    loading="lazy"
                    className="xl:w-[8vw] md:w-[15vw] w-[25vw] h-fit object-cover object-center"
                  />
                <div className="space-y-2">
                  <p className="font-semibold text-blackText">{title}</p>
                  <p className="text-blackText font-medium">
                    {category} -{" "}
                    <span className="text-grayText font-light text-sm">
                      {moment(createdAt).format("ll")}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* image */}
      {homePageLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        homePageContent?.content?.otherSections[0] && (
          <div className="w-full h-full">
            <Image
              src={BaseUrl.concat(
                homePageContent?.content?.otherSections[0].image
              )}
              alt=""
              loading="lazy"
              width={1000}
              height={1000}
              className="w-full h-full md:pt-10 pt-5 object-cover object-center"
            />
          </div>
        )
      )}
    </div>
  );
};

export default RecentArticles;
