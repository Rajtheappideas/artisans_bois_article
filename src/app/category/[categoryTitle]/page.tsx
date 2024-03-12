"use client";
import SingalCategory from "@/components/Home/SingalCategory";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Articles, SingleArticle } from "@/types";
import { handleGetArticles } from "@/redux/GetContentSlice";
import SingalPost from "@/components/Home/SingalPost";

const CategoryByTitle = ({
  params: { categoryTitle },
}: {
  params: { categoryTitle: String };
}) => {
  const [categoriesParams, setCategoriesParams] = useState<SingleArticle[]>([]);

  const { categories, articleLoading, articles } = useAppSelector(
    (s) => s.root.getcontent
  );

  const dispatch = useAppDispatch();

  function handleFilterArticles(): void {
    if (articles.length === 0 || articleLoading) return;
    const filteredArticles: SingleArticle[] = articles.filter(
      (article) => article.category == categoryTitle
    );
    setCategoriesParams(filteredArticles);
  }

  useEffect(() => {
    handleFilterArticles();
  }, [articleLoading, articles]);

  useEffect(() => {
    dispatch(handleGetArticles());
  }, []);

  return (
    <div className="Container">
      <p className="relative text-lg ml-3 text-blackText">
        Search Result :{" "}
        <span className="font-semibold capitalize">{categoryTitle}</span>
        <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
      </p>
      <div className="w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-start items-start md:gap-6 gap-3">
        {articleLoading ? (
          <div className="loading col-span-full">Loading...</div>
        ) : categoriesParams.length > 0 ? (
          categoriesParams.map(
            ({
              _id,
              image,
              title,
              content,
              createdAt,
              author,
              category,
              slug,paid
            }) => (
              <SingalPost
                from="single_category"
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
          <div className="loading col-span-full">
            No articles found related to {categoryTitle}.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryByTitle;
