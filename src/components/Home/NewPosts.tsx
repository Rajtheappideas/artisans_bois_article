import React from "react";
import postImage from "../../../public/static/images/newpost.png";
import SingalPost from "./SingalPost";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { SingleArticle } from "@/types";

type NewPostsProps = {
  name: string;
  articles: SingleArticle[];
};

const NewPosts = ({ name, articles }: NewPostsProps) => {
  const { homePageContent, homePageLoading } = useAppSelector(
    (state) => state.root.getcontent
  );

  return (
    <div className="w-full md:space-y-7 space-y-3">
      {/* title */}
      <div className="w-full flex items-center justify-between gap-2">
        <p className="relative capitalize text-lg ml-3 font-semibold text-blackText">
          New Posts from {name}
          <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
        </p>
      </div>
      {/* posts */}
      <div className="w-full h-full grid lg:grid-cols-2 gap-5 place-items-start items-start">
        {homePageLoading ? (
          <div className="loading col-span-full">Loading...</div>
        ) : homePageContent?.categories &&
          articles.length > 0 &&
          !homePageLoading ? (
          articles.map(
            ({
              _id,
              author,
              title,
              content,
              category,
              createdAt,
              image,
              slug,
              paid,
            }) => (
              <SingalPost
                from="home"
                description={content}
                title={title}
                author={author?.name}
                category={category}
                date={new Date(createdAt)}
                image={image}
                slug={slug}
                paid={paid}
                key={_id}
              />
            )
          )
        ) : (
          <div className="loading col-span-full">No articles found here.</div>
        )}
      </div>
      {/* image */}
      {/* <Image src={postImage} alt="" loading="lazy" className="w-full h-fit" /> */}
    </div>
  );
};

export default NewPosts;
