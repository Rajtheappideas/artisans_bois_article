"use client";
import SingalPost from "@/components/Home/SingalPost";
import { handleGetArticles } from "@/redux/GetContentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

const Articles = () => {
  const { articleLoading, articles } = useAppSelector(
    (state) => state.root.getcontent
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleGetArticles());
  }, []);

  return (
    <div className="Container">
      <div className="w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-start items-start md:gap-6 gap-3">
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
                from="articles"
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
    </div>
  );
};

export default Articles;
