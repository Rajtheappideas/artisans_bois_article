"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useAuthCheck = () => {
  const { user } = useAppSelector((s) => s.root.auth);

  const router = useRouter();

  const { handleChangeLoginModal } = useGlobalContext();

  function checkAuth() {
    if (!user) {
      toast.error("Please login to access this page.");
      router.push("/");
      handleChangeLoginModal(true);
      return;
    }
  }
  return { checkAuth };
};

export default useAuthCheck;
