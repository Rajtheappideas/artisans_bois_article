"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  handleGetArticles,
  handleGetHomePageConent,
} from "@/redux/GetContentSlice";
import BaseUrl from "@/BaseUrl";
import Image from "next/image";

const Herosection = dynamic(() => import("@/components/Home/Herosection"));
const ArticlesCategories = dynamic(
  () => import("@/components/Home/ArticlesCategories")
);
const RecentArticles = dynamic(
  () => import("@/components/Home/RecentArticles")
);
const NewPosts = dynamic(() => import("@/components/Home/NewPosts"));
const LatestVideos = dynamic(() => import("@/components/Home/LatestVideos"));

const Home = () => {
  const { homePageContent, homePageLoading } = useAppSelector(
    (s) => s.root.getcontent
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handleGetArticles());
    dispatch(handleGetHomePageConent());
  }, []);

  return (
    <>
      <div className="bg-lightGray">
        <div className="Container ">
          {homePageLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Herosection />
          )}
          <ArticlesCategories />
          <RecentArticles />
          {!homePageLoading ? (
            homePageContent?.categories &&
            homePageContent?.categories.length > 0 &&
            homePageContent?.categories.map(
              ({ category: { _id, name }, articles }) => (
                <NewPosts key={_id} name={name} articles={articles} />
              )
            )
          ) : (
            <div className="loading">Loading...</div>
          )}
          {homePageLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            homePageContent?.content?.otherSections[1] && (
              <div className="w-full h-full">
                <Image
                  src={BaseUrl.concat(
                    homePageContent?.content?.otherSections[1].image
                  )}
                  alt=""
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className="w-full h-full md:pt-10 pt-5 object-cover object-center"
                />
              </div>
            )
          )}

          {/* <LatestVideos /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
