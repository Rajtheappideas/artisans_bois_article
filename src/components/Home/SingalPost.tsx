import React from "react";
import Image, { StaticImageData } from "next/image";

interface singalPostsProps {
  image: StaticImageData;
}

const SingalPost = ({ image }: singalPostsProps) => {
  return (
    <div className="w-full flex xl:flex-row flex-col xl:h-[35vh] items-start gap-3 rounded-lg shadow-lg p-3">
      <Image
        src={image.src}
        alt=""
        width={300}
        height={100}
        loading="lazy"
        className="xl:min-w-[50%] xl:h-full h-40 w-full object-cover rounded-lg "
      ></Image>

      <div className="space-y-1 flex flex-col justify-between h-full gap-2 items-start ">
        <div className="h-full flex-1 space-y-1">
          <p className="font-semibold text-lg">
            12 Mobile UX Design Trends For 2018
          </p>
          <p className="text-blackText text-opacity-50 line-clamp-2">
            Things move quickly in the mobile app universe. To succeed in the
            field of mobile UX design, designers must have the foresight and
            prepare for new challenges around the corner
          </p>
        </div>
        <div className="w-full rounded-xl bg-gray-100 p-3 mt-auto flex-initial">
          <p className="font-semibold">CARPENTRY</p>
          <p className="font-light text-sm">July 14, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default SingalPost;
