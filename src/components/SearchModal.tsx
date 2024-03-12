"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { Articles, SingleArticle } from "@/types";
import { useGlobalContext } from "@/context/globalContext";
import {
  handleChangeSearchArticles,
  handleChangeSearchTerm,
} from "@/redux/GetContentSlice";

const SearchModal = () => {
  const { articles, searchTerm } = useAppSelector((s) => s.root.getcontent);
  console.log(searchTerm);
  

  const dispatch = useAppDispatch();

  const navigate = useRouter();

  const modalRef = useRef<HTMLFormElement>(null);

  const { t } = useTranslation();

  const { handleChangeSearchModal, showSearchModal } = useGlobalContext();

  const handleSearchArticles = (e: FormEvent) => {
    e.preventDefault();
    toast.remove();
    if (!searchTerm) return toast.error(t("Enter a word"));
    const filteredArticles: SingleArticle[] = articles.filter((entry) =>
      Object.values(entry).some((val) => {
        if (typeof val === "string") {
          return val
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase());
        }
      })
    );
    toast.remove();
    console.log(filteredArticles);
    
    if (filteredArticles.length === 0)
      return toast.error(t("Article not found"));
    toast.loading("Searching...");
    setTimeout(() => {
      toast.remove();
      dispatch(handleChangeSearchArticles(filteredArticles));
      handleClickOutside();
      navigate.push(`/search`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  function handleClickOutside(): void {
    handleChangeSearchModal(false);
    window.document.body.style.overflow = "unset";
  }

  useEffect(() => {
    if (showSearchModal) {
      window.document.body.style.overflow = "hidden";
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current instanceof HTMLFormElement &&
        !modalRef.current.contains(event.target as Node) &&
        showSearchModal
      ) {
        handleChangeSearchModal(false);
        window.document.body.style.overflow = "unset";
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, showSearchModal, modalRef]);

  useEffect(() => {
    return () => {
      window.document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div
        className={`fixed z-50 ${
          showSearchModal ? "scale-100" : "scale-0"
        } transition-all duration-300 origin-center inset-0 bg-black bg-opacity-30`}
      ></div>
      <form
        onSubmit={handleSearchArticles}
        ref={modalRef}
        className={`bg-white xl:w-1/2 md:w-2/3 w-11/12 flex md:flex-row flex-col items-center gap-2 z-50 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:p-4 p-2 rounded-lg transition-all duration-300 origin-center ${
          showSearchModal ? "scale-100" : "scale-0"
        } `}
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full input_field"
            value={searchTerm}
            onChange={(e) => dispatch(handleChangeSearchTerm(e.target.value))}
          />
          {/* <AiOutlineSearch
            className="w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3"
            role="button"
          /> */}
        </div>
        <button className="blue_button md:h-12 h-10 md:w-40 w-full">
          {t("Search")}
        </button>
      </form>
    </>
  );
};

export default SearchModal;
