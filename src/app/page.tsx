import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";

const Herosection = dynamic(() => import("@/components/Home/Herosection"));
const ArticlesCategories = dynamic(() => import("@/components/Home/ArticlesCategories"));
const RecentArticles = dynamic(() => import("@/components/Home/RecentArticles"));
const NewPosts = dynamic(() => import("@/components/Home/NewPosts"));
const LatestVideos = dynamic(() => import("@/components/Home/LatestVideos"));

const page = () => {
  return (
    <div className="">
      <Header />
      <div className="md:space-y-10 space-y-5 container mx-auto py-10 w-full xl:px-0 px-5 mb-20">
        <Herosection />
        <ArticlesCategories />
        <RecentArticles />
        <NewPosts />
        <LatestVideos />
      </div>
      <Footer />
    </div>
  );
};

export default page;
