"use client";
import { handleGetArticles } from "@/redux/GetContentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

const Articles = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { articleLoading, articles } = useAppSelector(
    (state) => state.root.getcontent
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleGetArticles());
  }, []);

  return (
    <div className="h-screen">
      {articles.map(
        ({ _id, category, content, image, paid, slug, title, tags }) => (
          <div className="" key={_id}>
            <p>{category}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Articles;
