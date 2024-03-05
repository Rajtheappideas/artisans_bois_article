import BaseUrl from "@/BaseUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SingalCategoryProps {
  image: string;
  name: string;
  description?: string;
  creator?: string;
  date?: string;
}

const SingalCategory = ({
  image,
  name,
  creator,
  date,
  description,
}: SingalCategoryProps) => {
  return (
    <div className="w-full bg-white cursor-pointer overflow-hidden h-full rounded-lg shadow-lg p-3">
      <Link
        href={`/category/${name?.split(/[\s,]+/).join("-")}`}
        className="w-full h-full  space-y-3"
        title={name}
      >
        <div className=" relative 2xl:h-80 md:h-60 h-40 w-full">
          <Image
            src={BaseUrl.concat(image)}
            alt=""
            fill
            className="w-full transition-all overflow-hidden duration-300 ease-in-out hover:scale-105 object-cover rounded-lg h-full"
            loading="lazy"
          />
        </div>
        <p className="lg:text-lg font-semibold w-full truncate">{name}</p>
        <p className="line-clamp-2 w-full text-blackText">{description}</p>
        {creator && (
          <p className="text-blackText text-sm">
            {creator} | {date}
          </p>
        )}
      </Link>
    </div>
  );
};

export default SingalCategory;
