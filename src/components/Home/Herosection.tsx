"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import BaseUrl from "@/BaseUrl";

const Herosection = () => {
  const { homePageLoading, homePageContent } = useAppSelector(
    (s) => s.root.getcontent
  );

  if (homePageLoading) {
    return (
      <div className="w-full h-[80vh] grid lg:grid-cols-2 gap-3">
        <div className="w-full h-full animate-pulse ease-in-out bg-gray-200 duration-200"></div>
        <div className="w-full h-full grid grid-cols-2 gap-3">
          <div className="w-full h-full animate-pulse ease-in-out bg-gray-200 duration-200"></div>
          <div className="w-full h-full animate-pulse ease-in-out bg-gray-200 duration-200"></div>
          <div className="w-full lg:h-full lg:block hidden col-span-full animate-pulse ease-in-out bg-gray-200 duration-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full grid ${
        homePageContent?.content.heroSection &&
        homePageContent?.content.heroSection.length > 1
          ? "grid-cols-2"
          : "grid-cols-1"
      } place-items-start items-start md:gap-3 gap-1`}
    >
      {homePageContent?.content.heroSection &&
        homePageContent?.content.heroSection.length > 0 && (
          <div className="relative w-full 3xl:h-[50vh] 2xl:h-[40vh] xl:h-[80vh] md:h-[50vh] h-[40vh] overflow-hidden">
            <Link
              href={`${
                homePageContent?.content.heroSection[0]?.type === "Article"
                  ? `/articles/${homePageContent?.content.heroSection[0]?.content?.slug}`
                  : homePageContent?.content.heroSection[0]?.content?.url ?? ""
              }
              
              `}
              target={
                homePageContent.content.heroSection[0]?.type === "Article"
                  ? "_self"
                  : "_blank"
              }
              className="w-full h-full group overflow-hidden"
            >
              <div className="w-full relative h-full">
                <Image
                  src={BaseUrl.concat(
                    homePageContent?.content.heroSection[0]?.content?.image
                  )}
                  alt=""
                  fill
                  className="transition-all duration-300 ease-in-out hover:scale-110 w-full h-full object-cover"
                />
              </div>
              {/* bottom text */}
              <div className="w-full absolute z-10 bottom-3  text-white md:left-4 left-2 capitalize">
                <p className="font-semibold mb-2 xl:text-4xl md:text-2xl text-lg line-clamp-2 w-11/12">
                  {homePageContent?.content.heroSection[0]?.type === "Article"
                    ? homePageContent?.content.heroSection[0]?.content.title
                    : homePageContent?.content.heroSection[0]?.content.content}
                </p>
                <p className="font-light text-sm">
                  {homePageContent?.content.heroSection[0]?.category?.name} |
                  {/* {homePageContent?.content.heroSection[0]?.category.} */}
                </p>
              </div>
              <p className="bg-black/20 w-full bottom-0 transition-all duration-300 ease-in-out 2xl:group-hover:h-1/4 group-hover:h-1/5 h-0 left-0 z-0 absolute"></p>
            </Link>
          </div>
        )}
      {homePageContent?.content.heroSection &&
        homePageContent.content.heroSection.length > 1 && (
          <div
            className={`w-full 3xl:h-[50vh] 2xl:h-[40vh] md:h-[80vh] h-screen grid ${
              homePageContent?.content.heroSection &&
              homePageContent.content.heroSection.length > 2 &&
              " md:grid-cols-2"
            } place-items-start items-start md:gap-3 gap-1`}
          >
            {homePageContent?.content.heroSection &&
              homePageContent.content.heroSection.length > 1 && (
                <Link
                  href={`${
                    homePageContent.content.heroSection[1]?.type === "Article"
                      ? `/articles/${homePageContent?.content.heroSection[1]?.content?.slug}`
                      : homePageContent?.content.heroSection[1]?.content?.url ??
                        ""
                  }
                
                `}
                  target={
                    homePageContent.content.heroSection[1]?.type === "Article"
                      ? "_self"
                      : "_blank"
                  }
                  className="w-full h-full "
                >
                  <div className="relative w-full h-full group overflow-hidden">
                    <Image
                      src={BaseUrl.concat(
                        homePageContent?.content.heroSection[1]?.content?.image
                      )}
                      alt=""
                      fill
                      loading="lazy"
                      className="w-full transition-all duration-300 ease-in-out hover:scale-110 h-full object-cover"
                    />
                    <div className="w-full absolute z-10 bottom-3 text-wrap text-white lg:left-3 left-2 capitalize">
                      <p className="font-semibold mb-2 md:text-lg w-11/12 line-clamp-2">
                        {homePageContent?.content.heroSection[1]?.type ===
                        "Article"
                          ? homePageContent?.content.heroSection[1]?.content
                              .title
                          : homePageContent?.content.heroSection[1]?.content
                              .content}
                      </p>
                      <p className="font-light lg:text-sm text-xs text-wrap">
                        {
                          homePageContent?.content.heroSection[1]?.category
                            ?.name
                        }{" "}
                        | OCTOBER 16, 2023
                      </p>
                    </div>
                    <p className="bg-black/20 w-full bottom-0 transition-all duration-300 ease-in-out 2xl:group-hover:h-1/4 group-hover:h-1/5 h-0 left-0 z-0 absolute"></p>
                  </div>
                </Link>
              )}
            {homePageContent?.content.heroSection &&
              homePageContent.content.heroSection.length > 2 && (
                <Link
                  href={`${
                    homePageContent.content.heroSection[2]?.type === "Article"
                      ? `/articles/${homePageContent?.content.heroSection[2]?.content?.slug}`
                      : homePageContent?.content.heroSection[2]?.content?.url ??
                        ""
                  }
              
              `}
                  target={
                    homePageContent.content.heroSection[2]?.type === "Article"
                      ? "_self"
                      : "_blank"
                  }
                  className="w-full h-full"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={BaseUrl.concat(
                        homePageContent?.content.heroSection[2]?.content?.image
                      )}
                      alt=""
                      fill
                      loading="lazy"
                      className="w-full transition-all duration-300 ease-in-out hover:scale-110 h-full object-cover"
                    />
                    <div className="w-full absolute z-10 bottom-3 text-wrap text-white lg:left-3 left-2 capitalize">
                      <p className="font-semibold mb-2 md:text-lg w-11/12 line-clamp-2">
                        {BaseUrl.concat(
                          homePageContent?.content.heroSection[2]?.content
                            ?.title ?? ""
                        )}
                      </p>
                      <p className="font-light lg:text-sm text-xs text-wrap">
                        {
                          homePageContent?.content.heroSection[2]?.category
                            ?.name
                        }{" "}
                        | OCTOBER 16, 2023
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            {homePageContent?.content.heroSection &&
              homePageContent.content.heroSection.length > 3 && (
                <Link
                  href={`${
                    homePageContent.content.heroSection[3]?.type === "Article"
                      ? `/articles/${homePageContent?.content.heroSection[3]?.content?.slug}`
                      : homePageContent?.content.heroSection[3]?.content?.url ??
                        ""
                  }
              
              `}
                  target={
                    homePageContent.content.heroSection[3]?.type === "Article"
                      ? "_self"
                      : "_blank"
                  }
                  className="w-full h-full col-span-full"
                >
                  <div className="relative w-[100%] h-full overflow-hidden">
                    <Image
                      src={BaseUrl.concat(
                        homePageContent?.content.heroSection[3]?.content?.image
                      )}
                      alt=""
                      fill
                      loading="lazy"
                      className="w-full transition-all duration-300 ease-in-out hover:scale-110 h-full object-cover"
                    />
                    <div className="w-full absolute z-10 bottom-3 text-wrap text-white lg:left-3 left-2 capitalize">
                      <p className="font-semibold mb-2 md:text-lg w-11/12 line-clamp-2">
                        {BaseUrl.concat(
                          homePageContent?.content.heroSection[3]?.content
                            ?.title
                        )}
                      </p>
                      <p className="font-light lg:text-sm text-xs text-wrap">
                        {
                          homePageContent?.content.heroSection[3]?.category
                            ?.name
                        }{" "}
                        | OCTOBER 16, 2023
                      </p>
                    </div>
                  </div>
                </Link>
              )}
          </div>
        )}
    </div>
  );
};

export default Herosection;
