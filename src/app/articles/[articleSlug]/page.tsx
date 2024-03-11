"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineFolder,
  AiOutlineUser,
} from "react-icons/ai";
import RelatedArticles from "@/components/RelatedArticles";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  handleChangeSingleArticle,
  handleGetArticleBySlug,
  handleGetArticles,
} from "@/redux/GetContentSlice";
import BaseUrl from "@/BaseUrl";
import moment from "moment";
import { Articles, SingleArticle } from "@/types";
import useAuthCheck from "@/hooks/useAuthCheck";

const ArticleSlug = ({
  params: { articleSlug },
}: {
  params: { articleSlug: string };
}) => {
  const [topPosts, setTopPosts] = useState<SingleArticle[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<SingleArticle[]>([]);

  const { articleLoading, singleArticle, articles } = useAppSelector(
    (s) => s.root.getcontent
  );

  const {
    author,
    category,
    content,
    createdAt,
    image,
    paid,
    slug,
    tags,
    title,
    _id: id,
  } = singleArticle ?? {};

  const dispatch = useAppDispatch();

  const { checkAuth } = useAuthCheck();

//   function handleFilterArticles(): void {
//     if (articles.length === 0 || articleLoading) return;
//     const topPosts: SingleArticle[] = articles
//       .filter((article) => article.category === category && article._id !== id)
//       .sort(
//         (a, b) =>
//           new Date(a.createdAt).getDate() - new Date(b.createdAt).getDate()
//       )
//       .slice(0, 6);
//     setTopPosts(topPosts);
//     const relatedArticles: SingleArticle[] = articles.filter(
//       (article) => article.category === category && article._id !== id
//     );
//     setRelatedArticles(relatedArticles);
//   }

  useEffect(() => {
//     handleFilterArticles();
  }, [articleLoading, articles]);

  useEffect(() => {
    checkAuth();
    dispatch(handleGetArticleBySlug({ slug: articleSlug })).catch((err) => {
      console.log(err);
    });
    dispatch(handleGetArticles());
    return () => {
      dispatch(handleChangeSingleArticle(null));
    };
    /* eslint-enable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="Container">
      {articleLoading ? (
        <div className="loading w-full">Loading...</div>
      ) : (
        <>
          <div className="flex xl:flex-row flex-col items-start  gap-5 w-full">
            {/* left side */}
            <div className="xl:w-8/12 w-full md:space-y-6 space-y-3">
              {/* image */}
              <div className="2xl:h-[40vh] h-[50vh] relative w-full">
                <Image
                  src={BaseUrl.concat(image ?? "")}
                  alt={title ?? ""}
                  fill
                  loading="lazy"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              {/* title */}
              <div className="space-y-2">
                <h1 className="font-bold md:text-4xl text-2xl capitalize">
                  {title}
                </h1>
                {/* date / category / creator */}
                <div className="flex md:items-center md:gap-4 gap-2 md:flex-row flex-col">
                  <div className="flex items-center gap-2 text-blackText font-medium">
                    <AiOutlineFolder />
                    <span>Category :</span>
                    <span className="capitalize">{category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blackText font-medium">
                    <AiOutlineCalendar />
                    <span>{moment(createdAt).format("LL")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blackText font-medium">
                    <AiOutlineUser />
                    <span>By :</span>
                    <span className="capitalize">{author?.name}</span>
                  </div>
                </div>
              </div>
              {/* description */}
              <div className="space-y-3">
                {content}
                {/* <p className="text-blackText font-semibold text-2xl">
                Don’t wait. The purpose of our lives is to be happy!
              </p>
              <p className="font-medium xl:text-left text-justify">
                Upon arrival, your senses will be rewarded with the pleasant
                scent of lemongrass oil used to clean the natural wood found
                throughout the room, creating a relaxing atmosphere within the
                space. A wonderful serenity has taken possession of my entire
                soul, like these sweet mornings of spring which I enjoy with my
                whole heart. I am alone, and feel the charm of existence in this
                spot, which was created for the bliss of souls like mine. I am
                so happy, my dear friend, so absorbed in the exquisite.
              </p> */}
              </div>
              <div className="2xl:h-[40vh] h-[50vh] relative w-full">
                <Image
                  src={image ?? ""}
                  alt=""
                  fill
                  loading="lazy"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              {/* description */}
              <div className="space-y-3">
                {content}
                {/* <p className="text-blackText font-semibold text-2xl">
                Don’t wait. The purpose of our lives is to be happy!
              </p>
              <p className="font-medium xl:text-left text-justify">
                Upon arrival, your senses will be rewarded with the pleasant
                scent of lemongrass oil used to clean the natural wood found
                throughout the room, creating a relaxing atmosphere within the
                space. A wonderful serenity has taken possession of my entire
                soul, like these sweet mornings of spring which I enjoy with my
                whole heart. I am alone, and feel the charm of existence in this
                spot, which was created for the bliss of souls like mine. I am
                so happy, my dear friend, so absorbed in the exquisite.
              </p>
              <p className="font-medium xl:text-left text-justify">
                Upon arrival, your senses will be rewarded with the pleasant
                scent of lemongrass oil used to clean the natural wood found
                throughout the room, creating a relaxing atmosphere within the
                space. A wonderful serenity has taken possession of my entire
                soul, like these sweet mornings of spring which I enjoy with my
                whole heart. I am alone, and feel the charm of existence in this
                spot, which was created for the bliss of souls like mine. I am
                so happy, my dear friend, so absorbed in the exquisite.
              </p> */}
              </div>
            </div>
            {/* right side */}
            <div className="xl:w-4/12 w-full md:space-y-6 space-y-3 ">
              {/* creator */}
              <div className="w-full rounded-lg p-3 bg-midGray relative flex items-center gap-2 text-blackText">
                <Image
                  src={BaseUrl.concat(author?.profile ?? "")}
                  alt={author?.name ?? ""}
                  height={100}
                  width={100}
                  className="h-20 w-20 border rounded-lg object-cover"
                />
                <div>
                  <p className="text-blackText font-light">Post By</p>
                  <p className="text-black font-semibold text-lg capitalize">
                    {author?.name ?? ""}
                  </p>
                </div>
              </div>
              {/* top post */}
              <div className="w-full space-y-2 rounded-lg p-3 bg-midGray">
                <p className="relative md:text-xl text-lg ml-3 font-semibold text-blackText">
                  Top Post
                  <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
                </p>
                {topPosts.map(
                  ({
                    title,
                    content,
                    image,
                    createdAt,
                    author: { name },
                    slug,
                  }) => (
                    <div className=" w-full hover:bg-gray-200 transition-all duration-300 p-1 ease-in-out rounded-lg">
                      <Link
                        href={`/articles/${slug}`}
                        className="w-full flex  items-center gap-2 "
                      >
                        <Image
                          src={BaseUrl.concat(image)}
                          alt={title}
                          height={100}
                          width={100}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="space-y-2 w-full">
                          <p className="text-black line-clamp-2 font-semibold">
                            {title}
                          </p>
                          <p className="text-blackText font-light text-sm">
                            {name} | {moment(createdAt).format("ll")}
                          </p>
                        </div>
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <RelatedArticles articles={relatedArticles} />
        </>
      )}
    </div>
  );
};

export default ArticleSlug;
