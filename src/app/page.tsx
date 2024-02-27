import React from "react";
import dynamic from "next/dynamic";

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
  return (
    <div className="bg-lightGray">
      <div className="Container ">
        <Herosection />
        <ArticlesCategories />
        <RecentArticles />
        <NewPosts />
        <LatestVideos />
      </div>
    </div>
  );
};

export default Home;
