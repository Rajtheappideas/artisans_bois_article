import React from "react";
import category1 from "../../../public/static/images/Image.png";
import postImage from "../../../public/static/images/newpost.png";
import SingalPost from "./SingalPost";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";

const NewPosts = () => {
  const { articleLoading, articles } = useAppSelector(
    (state) => state.root.getcontent
  );
  return (
    <div className="w-full md:space-y-7 space-y-3">
      {/* title */}
      <div className="w-full flex items-center justify-between gap-2">
        <p className="relative capitalize text-lg ml-3 font-semibold text-blackText">
          New Posts
          <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
        </p>
      </div>
      {/* posts */}
      <div className="w-full h-full grid lg:grid-cols-2 gap-5 place-items-start items-start">
        {articleLoading ? (
          <div className="loading col-span-full">Loading...</div>
        ) : articles.length > 0 ? (
          articles.map(
            ({
              _id,
              image,
              title,
              content,
              createdAt,
              author,
              category,
              slug,
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
                key={_id}
              />
            )
          )
        ) : (
          <div className="loading col-span-full">No articles found here.</div>
        )}
      </div>
      {/* image */}
      <Image src={postImage} alt="" loading="lazy" className="w-full h-fit" />
    </div>
  );
};

export default NewPosts;
