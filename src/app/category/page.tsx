"use client";
import React from "react";
import image1 from "../../../public/static/images/Image3.png";
import SingalCategory from "@/components/Home/SingalCategory";

const Categories = () => {
  return (
    <div className="bg-lightGray">
      <div className="Container  bg-lightGray">
        <p className="relative text-lg ml-3 text-blackText">
          All Categories
          {/* <span className="font-semibold capitalize">Outdoor facilities</span> */}
          <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
        </p>
        <div className="w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-start items-start md:gap-6 gap-3">
          {new Array(12).fill(0).map((search, i) => (
            <SingalCategory
              key={i}
              title="Opening Day of Boating Season, Seattle WA"
              description="Of course the Puget Sound is very watery, and where there is water,
            there are boats. Today is the Grand Opening of Boating Season when
          traffic gets stalled in the University District (UW) while the Montlake
          Bridge"
              image={image1}
              creator="Craig Bator "
              date="27 Dec 2024"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;