import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Herosection from "@/components/Home/Herosection";
import ArticlesCategories from "@/components/Home/ArticlesCategories";
import RecentArticles from "@/components/Home/RecentArticles";
import NewPosts from "@/components/Home/NewPosts";
import LatestVideos from "@/components/Home/LatestVideos";

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
