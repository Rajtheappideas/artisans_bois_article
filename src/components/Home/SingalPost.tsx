import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

interface singalPostsProps {
  image: string;
  from?: string;
  title: string;
  description: string;
  category?: string;
  author?: string;
  slug?: string;
  date: Date;
}

const SingalPost = ({
  image,
  from,
  category,
  author,
  date,
  description,
  title,
  slug,
}: singalPostsProps) => {
  return (
    <Link href={`/articles/${slug}`} className="w-full">
      <div
        className={`w-full cursor-pointer ${
          from === "articles" || from === "single_category"
            ? "flex-col"
            : "xl:flex-row flex-col"
        } ${
          from === "single_category" &&
          "2xl:max-h-96 2xl:min-h-96  md:max-h-80 md:min-h-80 min-h-60"
        }  ${
          from === "articles" && "md:max-h-96 md:min-h-96 min-h-60"
        } flex items-start gap-3 rounded-lg shadow-lg p-3`}
      >
        <div
          className={`relative ${
            from === "articles" || from === "single_category"
              ? "w-full"
              : "xl:w-[50%] w-full"
          } 2xl:min-h-52 2xl:max-h-52 min-h-40 max-h-40`}
        >
          <Image
            src={image}
            alt=""
            fill
            loading="lazy"
            className="h-full w-full object-cover rounded-lg "
          ></Image>
        </div>
        <div className="space-y-1 flex flex-col justify-start flex-1 w-full  gap-2 items-start ">
          <div className="flex-1 space-y-1">
            <p className="font-semibold">{title}</p>
            <p className="text-blackText line-clamp-2 text-sm">{description}</p>
          </div>
          {from === "single_category" ? (
            <p className="text-blackText text-sm capitalize">
              {author} | {moment(date).format("ll")}
            </p>
          ) : (
            <div className="w-full rounded-xl bg-gray-100 md:p-3 p-1 mt-auto flex-initial">
              <p className="font-semibold uppercase">{category}</p>
              <p className="font-light text-sm">{moment(date).format("ll")}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SingalPost;
