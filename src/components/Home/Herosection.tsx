import Image from "next/image";
import React from "react";
import image1 from "../../../public/static/images/Image.png";
import image2 from "../../../public/static/images/Image (1).png";
import image3 from "../../../public/static/images/Image (2).png";
import image4 from "../../../public/static/images/Image (3).png";

const Herosection = () => {
  return (
    <div className="w-full grid lg:grid-cols-2 place-items-start items-start md:gap-3 gap-1">
      <div className="relative w-full h-full overflow-hidden">
        <Image src={image1} alt="" className="transition-all duration-300 ease-in-out hover:scale-110 w-full md:h-full h-[40vh] object-cover" />
        <div className="w-full absolute bottom-3  text-white md:left-4 left-2 capitalize">
          <p className="font-semibold mb-2 lg:text-4xl md:text-2xl text-lg">
            Bathroom floor coverings from MEISTER
          </p>
          <p className="font-light text-sm">CARPENTRY | OCTOBER 16, 2023</p>
        </div>
      </div>
      <div className="w-full h-full grid md:grid-cols-2 place-items-start items-start md:gap-3 gap-1">
        <div className="relative w-full md:h-full h-[40vh] overflow-hidden">
          <Image src={image2} alt="" className="w-full transition-all duration-300 ease-in-out hover:scale-110 max-h-full object-cover" />
          <div className="w-full absolute bottom-3 text-wrap text-white lg:left-4 left-2 capitalize">
            <p className="font-semibold mb-2 text-lg w-11/12">
              They’re back! Kennedy Darling named to return to
            </p>
            <p className="font-light lg:text-sm text-xs text-wrap">CARPENTRY | OCTOBER 16, 2023</p>
          </div>
        </div>
        <div className="relative w-full md:h-full h-[40vh] overflow-hidden">
          <Image src={image3} alt="" className="w-full max-h-full object-cover transition-all duration-300 ease-in-out hover:scale-110" />
          <div className="w-full absolute bottom-3  text-white lg:left-4 left-2 capitalize">
          <p className="font-semibold mb-2 text-lg w-11/12">
              They’re back! Kennedy Darling named to return to
            </p>
            <p className="font-light text-sm">CARPENTRY | OCTOBER 16, 2023</p>
          </div>
        </div>
        <div className="relative w-full md:h-full max-h-[40vh] col-span-full overflow-hidden">
        <Image src={image4} alt="" className=" w-full max-h-full object-cover transition-all duration-300 ease-in-out hover:scale-110" />
          <div className="w-full absolute bottom-3  text-white lg:left-4 left-2 capitalize">
            <p className="font-semibold mb-2 md:text-2xl text-lg">
              They’re back! Kennedy Darling named to return to
            </p>
            <p className="font-light text-sm">CARPENTRY | OCTOBER 16, 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
