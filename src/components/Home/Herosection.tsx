import Image from "next/image";
import React from "react";
import image1 from "../../../public/static/images/Image.png";
import image2 from "../../../public/static/images/Image1.png";
import image3 from "../../../public/static/images/Image2.png";
import image4 from "../../../public/static/images/Image3.png";
import Link from "next/link";

const Herosection = () => {
  return (
    <div className="w-full grid xl:grid-cols-2 place-items-start items-start md:gap-3 gap-1">
      <div className="relative w-full 3xl:h-[50vh] 2xl:h-[40vh] xl:h-[80vh] md:h-[50vh] h-[40vh] overflow-hidden">
        <Link
          href="/articles/Bathroom floor coverings from MEISTER"
          className="w-full h-full"
        >
          <div className="w-full relative h-full">
            <Image
              src={image1}
              alt=""
              fill
              className="transition-all duration-300 ease-in-out hover:scale-110 w-full h-full object-cover"
            />
          </div>
          {/* bottom text */}
          <div className="w-full absolute bottom-3  text-white md:left-4 left-2 capitalize">
            <p className="font-semibold mb-2 xl:text-4xl md:text-2xl text-lg line-clamp-2 w-11/12">
              Bathroom floor coverings from MEISTER
            </p>
            <p className="font-light text-sm">CARPENTRY | OCTOBER 16, 2023</p>
          </div>
        </Link>
      </div>
      <div className="w-full 3xl:h-[50vh] 2xl:h-[40vh] md:h-[80vh] h-screen grid md:grid-cols-2 place-items-start items-start md:gap-3 gap-1">
        <Link
          href="/articles/They’re back! Kennedy Darling named to return to"
          className="w-full h-full"
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={image2}
              alt=""
              fill
              loading="lazy"
              className="w-full transition-all duration-300 ease-in-out hover:scale-110 h-full object-cover"
            />
            <div className="w-full absolute bottom-3 text-wrap text-white lg:left-3 left-2 capitalize">
              <p className="font-semibold mb-2 md:text-lg w-11/12 line-clamp-2">
                They’re back! Kennedy Darling named to return to
              </p>
              <p className="font-light lg:text-sm text-xs text-wrap">
                CARPENTRY | OCTOBER 16, 2023
              </p>
            </div>
          </div>
        </Link>
        <Link
          href="/articles/They’re back! Kennedy Darling named to return to"
          className="w-full h-full"
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={image3}
              alt=""
              loading="lazy"
              fill
              className="w-full h-full object-cover transition-all duration-300 ease-in-out hover:scale-110"
            />
            <div className="w-full absolute bottom-3   text-white lg:left-3 left-2 capitalize">
              <p className="font-semibold mb-2 md:text-lg w-11/12 line-clamp-2">
                They’re back! Kennedy Darling named to return to
              </p>
              <p className="font-light text-sm">CARPENTRY | OCTOBER 16, 2023</p>
            </div>
          </div>
        </Link>
        <Link
          href="/articles/They’re back! Kennedy Darling named to return to"
          className="w-full h-full col-span-full"
        >
          <div className="relative w-full h-full col-span-full overflow-hidden">
            <Image
              src={image4}
              alt=""
              loading="lazy"
              fill
              className=" w-full h-full object-cover transition-all duration-300 ease-in-out hover:scale-110"
            />
            <div className="w-full absolute bottom-3  text-white lg:left-4 left-2 capitalize">
              <p className="font-semibold mb-2 lg:text-2xl md:text-lg line-clamp-2 w-11/12">
                They’re back! Kennedy Darling named to return to
              </p>
              <p className="font-light text-sm">CARPENTRY | OCTOBER 16, 2023</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Herosection;
