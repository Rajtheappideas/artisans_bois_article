import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface singalPostsProps {
  image: StaticImageData;
  from?: String;
  title: String;
  description: String;
  category: String;
  date: String;
}

const SingalPost = ({
  image,
  from,
  category,
  date,
  description,
  title,
}: singalPostsProps) => {
  return (
    <Link
      href={`/articles/${title?.split(/[\s,]+/).join("-")}`}
      className="w-full h-auto"
    >
      <div
        className={`w-full cursor-pointer ${
          from === "articles" ? "flex-col" : " xl:flex-row flex-col"
        } flex 2xl:h-[25vh] items-start gap-3 rounded-lg shadow-lg p-3`}
      >
        <div
          className={`relative 2xl:h-full xl:h-40 2xl:flex-1 ${
            from === "articles" ? "w-full" : "xl:w-[50%] w-full"
          }  md:h-60 h-40`}
        >
          <Image
            src={image.src}
            alt=""
            fill
            loading="lazy"
            className="h-full w-full object-cover rounded-lg "
          ></Image>
        </div>
        <div className="space-y-1 flex flex-col justify-between flex-1 h-full gap-2 items-start ">
          <div className="h-full flex-1 space-y-1">
            <p className="font-semibold">{title}</p>
            <p className="text-blackText line-clamp-2 text-sm">{description}</p>
          </div>
          <div className="w-full rounded-xl bg-gray-100 md:p-3 p-1 mt-auto flex-initial">
            <p className="font-semibold uppercase">{category}</p>
            <p className="font-light text-sm">{date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingalPost;
