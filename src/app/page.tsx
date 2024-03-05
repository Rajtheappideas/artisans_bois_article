"use client";
import React, { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleGetCategories } from "@/redux/GetContentSlice";

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
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(handleGetCategories());
  // }, []);

  return (
    <div className="bg-lightGray">
      <div className="Container ">
        <Herosection />
        <ArticlesCategories />
        <RecentArticles />
        <NewPosts />
        {/* <LatestVideos /> */}
      </div>
    </div>
  );
};

export default Home;
