"use client";
import Image from "next/image";
import React from "react";
import image from "../../../../public/static/images/unsplash_-js8KGQLfhw.jpg";
import image1 from "../../../../public/static/images/unsplash_DGHy9KgdTj0.png";
import articleImage from "../../../../public/static/images/Image.png";
import articleImage1 from "../../../../public/static/images/Image1.png";
import {
  AiOutlineCalendar,
  AiOutlineFolder,
  AiOutlineUser,
} from "react-icons/ai";
import RelatedArticles from "@/components/RelatedArticles";
import Link from "next/link";

const ArticleById = ({ params }: { params: { articleId: String } }) => {
  return (
    <div className="Container">
      <div className="flex xl:flex-row flex-col items-start  gap-5 w-full">
        <div className="xl:w-8/12 w-full md:space-y-6 space-y-3">
          {/* image */}
          <div className="2xl:h-[40vh] h-[50vh] relative w-full">
            <Image
              src={articleImage}
              alt=""
              fill
              loading="lazy"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          {/* title */}
          <div className="space-y-2">
            <h1 className="font-bold md:text-4xl text-2xl">
              Bathroom floor coverings from MEISTER
            </h1>
            {/* date / category / creator */}
            <div className="flex md:items-center md:gap-4 gap-2 md:flex-row flex-col">
              <div className="flex items-center gap-2 text-blackText font-medium">
                <AiOutlineFolder />
                <span>Category :</span>
                <span>Carpentry</span>
              </div>
              <div className="flex items-center gap-2 text-blackText font-medium">
                <AiOutlineCalendar />
                <span>Octer 16, 2023</span>
              </div>
              <div className="flex items-center gap-2 text-blackText font-medium">
                <AiOutlineUser />
                <span>By :</span>
                <span>Louis Hoebregts</span>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="space-y-3">
            <p className="text-blackText font-semibold text-2xl">
              Don’t wait. The purpose of our lives is to be happy!
            </p>
            <p className="font-medium xl:text-left text-justify">
              Upon arrival, your senses will be rewarded with the pleasant scent
              of lemongrass oil used to clean the natural wood found throughout
              the room, creating a relaxing atmosphere within the space. A
              wonderful serenity has taken possession of my entire soul, like
              these sweet mornings of spring which I enjoy with my whole heart.
              I am alone, and feel the charm of existence in this spot, which
              was created for the bliss of souls like mine. I am so happy, my
              dear friend, so absorbed in the exquisite.
            </p>
          </div>
          <div className="2xl:h-[40vh] h-[50vh] relative w-full">
            <Image
              src={articleImage1}
              alt=""
              fill
              loading="lazy"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          {/* description */}
          <div className="space-y-3">
            <p className="text-blackText font-semibold text-2xl">
              Don’t wait. The purpose of our lives is to be happy!
            </p>
            <p className="font-medium xl:text-left text-justify">
              Upon arrival, your senses will be rewarded with the pleasant scent
              of lemongrass oil used to clean the natural wood found throughout
              the room, creating a relaxing atmosphere within the space. A
              wonderful serenity has taken possession of my entire soul, like
              these sweet mornings of spring which I enjoy with my whole heart.
              I am alone, and feel the charm of existence in this spot, which
              was created for the bliss of souls like mine. I am so happy, my
              dear friend, so absorbed in the exquisite.
            </p>
            <p className="font-medium xl:text-left text-justify">
              Upon arrival, your senses will be rewarded with the pleasant scent
              of lemongrass oil used to clean the natural wood found throughout
              the room, creating a relaxing atmosphere within the space. A
              wonderful serenity has taken possession of my entire soul, like
              these sweet mornings of spring which I enjoy with my whole heart.
              I am alone, and feel the charm of existence in this spot, which
              was created for the bliss of souls like mine. I am so happy, my
              dear friend, so absorbed in the exquisite.
            </p>
          </div>
        </div>
        {/* right side */}
        <div className="xl:w-4/12 w-full md:space-y-6 space-y-3 ">
          {/* creator */}
          <div className="w-full rounded-lg p-3 bg-midGray relative flex items-center gap-2 text-blackText">
            <Image
              src={image}
              alt=""
              height={100}
              width={100}
              className="h-20 w-20 rounded-lg object-cover"
            />
            <div>
              <p className="text-blackText font-light">Post By</p>
              <p className="text-black font-semibold text-lg">
                Louis Hoebregts
              </p>
            </div>
          </div>
          {/* top post */}
          <div className="w-full space-y-2 rounded-lg p-3 bg-midGray">
            <p className="relative md:text-xl text-lg ml-3 font-semibold text-blackText">
              Top Post
              <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
            </p>
            <div className=" w-full hover:bg-gray-200 transition-all duration-300 p-1 ease-in-out rounded-lg">
              <Link
                href={`/articles/123123`}
                className="w-full flex  items-center gap-2 "
              >
                <Image
                  src={image1}
                  alt=""
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="space-y-2 w-full">
                  <p className="text-black line-clamp-2 font-semibold">
                    How to Spend the Perfect Day on Croatia’s Most Magical
                    Island
                  </p>
                  <p className="text-blackText font-light text-sm">
                    Craig Bator | 27 Dec 2024
                  </p>
                </div>
              </Link>
            </div>
            <div className=" w-full hover:bg-gray-200 transition-all duration-300 p-1 ease-in-out rounded-lg">
              <Link
                href={`/articles/123`}
                className="w-full flex  items-center gap-2 "
              >
                <Image
                  src={image1}
                  alt=""
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="space-y-2 w-full">
                  <p className="text-black line-clamp-2 font-semibold">
                    How to Spend the Perfect Day on Croatia’s Most Magical
                    Island
                  </p>
                  <p className="text-blackText font-light text-sm">
                    Craig Bator | 27 Dec 2024
                  </p>
                </div>
              </Link>
            </div>
            <div className=" w-full hover:bg-gray-200 transition-all duration-300 p-1 ease-in-out rounded-lg">
              <Link
                href={`/articles/12312sdf3`}
                className="w-full flex  items-center gap-2 "
              >
                <Image
                  src={image1}
                  alt=""
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="space-y-2 w-full">
                  <p className="text-black line-clamp-2 font-semibold">
                    How to Spend the Perfect Day on Croatia’s Most Magical
                    Island
                  </p>
                  <p className="text-blackText font-light text-sm">
                    Craig Bator | 27 Dec 2024
                  </p>
                </div>
              </Link>
            </div>
            <div className=" w-full hover:bg-gray-200 transition-all duration-300 p-1 ease-in-out rounded-lg">
              <Link
                href={`/articles/123123`}
                className="w-full flex  items-center gap-2 "
              >
                <Image
                  src={image1}
                  alt=""
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="space-y-2 w-full">
                  <p className="text-black line-clamp-2 font-semibold">
                    How to Spend the Perfect Day on Croatia’s Most Magical
                    Island
                  </p>
                  <p className="text-blackText font-light text-sm">
                    Craig Bator | 27 Dec 2024
                  </p>
                </div>
              </Link>
            </div>
            <div className=" w-full hover:bg-gray-200 transition-all duration-300 p-1 ease-in-out rounded-lg">
              <Link
                href={`/articles/123123`}
                className="w-full flex  items-center gap-2 "
              >
                <Image
                  src={image1}
                  alt=""
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="space-y-2 w-full">
                  <p className="text-black line-clamp-2 font-semibold">
                    How to Spend the Perfect Day on Croatia’s Most Magical
                    Island
                  </p>
                  <p className="text-blackText font-light text-sm">
                    Craig Bator | 27 Dec 2024
                  </p>
                </div>
              </Link>
            </div>
          
          </div>
        </div>
      </div>
      <RelatedArticles />
    </div>
  );
};

export default ArticleById;
