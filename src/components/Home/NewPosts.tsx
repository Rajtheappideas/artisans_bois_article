import React from "react";
import SingalPost from "./SingalPost";
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

  if (homePageLoading) {
    return (
      <>
        <div className="w-full flex gap-2">
          <div className="w-1/3 h-60 animate-pulse ease-in-out bg-gray-200 duration-200"></div>
          <div className="w-1/3 h-60 animate-pulse ease-in-out bg-gray-200 duration-200"></div>
          <div className="w-1/3 h-60 animate-pulse ease-in-out bg-gray-200 duration-200"></div>
        </div>
      </>
    );
  }
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
        {!homePageLoading &&
        homePageContent?.categories &&
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
