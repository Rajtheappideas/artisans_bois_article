import { handleChangeLoading } from "@/redux/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { MutableRefObject, RefObject, useEffect, useRef } from "react";
import toast from "react-hot-toast";

// type CustomAbortController = AbortController & { signal: AbortSignal };

const useAbortApiCall = () => {
  const { loading } = useAppSelector((s) => s.root.auth);
  const AbortControllerRef: RefObject<AbortController> = useRef(
    new AbortController()
  );

  const dispatch = useAppDispatch();

  const abortApiCall = () => {
    toast.remove();
    if (AbortControllerRef.current) {
      AbortControllerRef.current.abort();
    }
    // Uncomment the next line if you want to show an error message on cancel
    // toast.error("Request Cancelled!!!");
  };
  useEffect(() => {
    return () => {
      if (loading) {
        dispatch(handleChangeLoading(false));
      }
    };
  }, []);
  return { AbortControllerRef, abortApiCall };
};

export default useAbortApiCall;
