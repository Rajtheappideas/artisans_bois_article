"use client";
import React, { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Image from "next/image";
import latestVideo from "../../../public/static/images/latestvideo.png";

const LatestVideos = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full md:space-y-7 space-y-3">
      {/* title */}
      <div className="w-full flex items-center justify-between gap-2">
        <p className="relative capitalize text-lg ml-3 font-semibold text-blackText">
          Latest Videos
          <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
        </p>
        {/* arrows */}
        {/* <div className="flex items-center gap-1">
          <button ref={prevRef} className="h-7 w-7">
            <AiOutlineLeft className="bg-gray-200 hover:bg-gray-300 rounded-lg text-black p-2 h-7 w-7" />
          </button>
          <button ref={nextRef} className="h-7 w-7">
            <AiOutlineRight className="bg-gray-200 hover:bg-gray-300 rounded-lg text-black p-2 h-7 w-7" />
          </button>
        </div> */}
      </div>
      {/* videos */}
      <div className="w-full flex xl:flex-row flex-col items-start md:gap-5 gap-3">
        <div className="xl:w-2/3 w-full relative">
          <div className="relative 2xl:h-[40vh] lg:h-[65vh] md:h-[50vh] h-[35vh]">
            <Image
              src={latestVideo}
              alt=""
              className="w-full object-cover h-full rounded-lg"
            />
          </div>
          <div className="absolute w-[95%] bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-lg text-blackText font-semibold text-left space-y-2 md:p-3 p-1">
            <p className="font-semibold lg:text-xl line-clamp-1 md:line-clamp-none">
              How Music Affects Your Brain (Plus 11 Artists To Listen To At
              Work)
            </p>
            <p className="font-light lg:text-base text-sm text-opacity-50 md:line-clamp-none line-clamp-1">
              You’ve read all your free member-only stories, become a member to
              get unlimited access. Your membership fee supports the voices you
              want to hear more from.
            </p>
          </div>
        </div>
        <div className="xl:w-1/3 xl:grid-cols-none grid md:grid-cols-2 w-full items-start gap-3 space-y-1 ">
          <div className="w-full p-3 flex items-center gap-2 rounded-lg shadow-lg">
            <Image
              src={latestVideo}
              alt=""
              className="w-24 h-24 rounded-lg object-cover object-center"
            />
            <div className="space-y-1">
              <p className="font-semibold text-lg line-clamp-1 md:w-10/12 w-11/12">
                5 reasons why you should wrap your hands when boxing
              </p>
              <p className="font-light text-opacity-50 w-full text-sm line-clamp-2">
                So, you finally went to your first boxing class and learned the
                basics of the sport. You also learned that it’s recommended to
                wrap your hands before putting on the gloves. But there are
                times when you just don’t feel like wrapping them and you wonder
                why you even need them. Well, this blog is going to explain the
                benefits of wrapping your hands.
              </p>
            </div>
          </div>
          <div className="w-full p-3 flex items-center gap-2 rounded-lg shadow-lg">
            <Image
              src={latestVideo}
              alt=""
              className="w-24 h-24 rounded-lg object-cover object-center"
            />
            <div className="space-y-1">
              <p className="font-semibold text-lg line-clamp-1 md:w-10/12 w-11/12">
                5 reasons why you should wrap your hands when boxing
              </p>
              <p className="font-light text-opacity-50 w-full text-sm line-clamp-2">
                So, you finally went to your first boxing class and learned the
                basics of the sport. You also learned that it’s recommended to
                wrap your hands before putting on the gloves. But there are
                times when you just don’t feel like wrapping them and you wonder
                why you even need them. Well, this blog is going to explain the
                benefits of wrapping your hands.
              </p>
            </div>
          </div>
          <div className="w-full p-3 flex items-center gap-2 rounded-lg shadow-lg">
            <Image
              src={latestVideo}
              alt=""
              className="w-24 h-24 rounded-lg object-cover object-center"
            />
            <div className="space-y-1">
              <p className="font-semibold text-lg line-clamp-1 md:w-10/12 w-11/12">
                5 reasons why you should wrap your hands when boxing
              </p>
              <p className="font-light text-opacity-50 w-full text-sm line-clamp-2">
                So, you finally went to your first boxing class and learned the
                basics of the sport. You also learned that it’s recommended to
                wrap your hands before putting on the gloves. But there are
                times when you just don’t feel like wrapping them and you wonder
                why you even need them. Well, this blog is going to explain the
                benefits of wrapping your hands.
              </p>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default LatestVideos;
