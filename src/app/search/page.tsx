"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import SingalCategory from "@/components/Home/SingalCategory";
import moment from "moment";

const Search = () => {
  const { searchedArticles, searchTerm } = useAppSelector(
    (state) => state.root.getcontent
  );

  return (
    <div className="bg-lightGray">
      <div className="Container">
        <p className="relative text-lg ml-3 text-blackText">
          Search Result : <span className="font-semibold ">{searchTerm}</span>
          <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
        </p>
        <div className="w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-start items-start md:gap-6 gap-3">
          {searchedArticles.map(
            ({ _id, image, title, author, category, content, createdAt }) => (
              <SingalCategory
                key={_id}
                name={title}
                description={content}
                image={image}
                creator={author?.name}
                date={moment(createdAt).format("ll")}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
