import Image, { StaticImageData } from "next/image";
import React from "react";

interface SingalCategoryProps {
  image: StaticImageData;
  name: String;
}

const SingalCategory = ({ image, name }: SingalCategoryProps) => {
  return (
    <div className="w-full overflow-hidden h-auto space-y-3 rounded-lg shadow-lg p-3">
      <div className=" relative 2xl:h-[20vh] md:h-[40vh] h-[30vh] w-full">
        <Image
          src={image}
          alt=""
          fill
          className="w-full transition-all overflow-hidden duration-300 ease-in-out hover:scale-105 object-cover rounded-lg h-full"
          loading="lazy"
        />
      </div>
      <p className="font-semibold text-lg text-left">{name}</p>
    </div>
  );
};

export default SingalCategory;
