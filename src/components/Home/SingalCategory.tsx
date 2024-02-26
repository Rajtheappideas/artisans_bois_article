import Image, { StaticImageData } from "next/image";
import React from "react";

interface SingalCategoryProps {
  image: StaticImageData;
  name: String;
}

const SingalCategory = ({ image, name }: SingalCategoryProps) => {
  return (
    <div className="w-full overflow-hidden space-y-3 rounded-lg shadow-lg p-3">
      <Image
        src={image}
        alt=""
        height={500}
        width={500}
        className="w-full transition-all overflow-hidden duration-300 ease-in-out hover:scale-105 object-cover rounded-lg h-fit"
        loading="lazy"
      />
      <p className="font-semibold text-lg text-left">{name}</p>
    </div>
  );
};

export default SingalCategory;
