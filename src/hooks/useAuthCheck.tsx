"use client";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useAuthCheck = () => {
  const { user } = useAppSelector((s) => s.root.auth);

  const router = useRouter();

  function checkAuth() {
    if (!user) {
//       toast.error("Please login to access this page.");
//       return router.push("/");
    }
  }
  return { checkAuth };
};

export default useAuthCheck;
