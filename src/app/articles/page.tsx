"use client";
import { usePathname, useRouter } from "next/navigation";

const Articles = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/articles") {
    return router.push("/");
  }
  // return <div>Articles</div>
};

export default Articles;
