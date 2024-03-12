import React, { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SingalPost from "./Home/SingalPost";
import { SingleArticle } from "@/types";

type RelatedArticlesProps = {
  articles: SingleArticle[];
};

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="w-full">
      {/* title */}
      <div className="w-full flex items-center justify-between gap-2">
        <p className="relative text-lg ml-3 font-semibold text-blackText">
          Related Articles
          <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
        </p>
        {/* arrows */}
        <div className="flex items-center gap-1">
          <button ref={prevRef} name="category_previous" className="h-7 w-7">
            <AiOutlineLeft className="swiper_button" />
          </button>
          <button ref={nextRef} name="category_next" className="h-7 w-7">
            <AiOutlineRight className="swiper_button" />
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
        {articles.map(
          ({ _id, category, title, content, createdAt, image, slug, paid }) => (
            <SwiperSlide key={_id} className="w-full py-2 pl-2 overflow-hidden">
              <SingalPost
                from="articles"
                description={content}
                category={category}
                date={new Date(createdAt)}
                image={image}
                title={title}
                slug={slug}
                paid={paid}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default RelatedArticles;
