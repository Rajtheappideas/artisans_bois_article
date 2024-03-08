"use client";
import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
// import {
//   handleChangeShowForgotPassword,
//   handleChangeShowOtpField,
// } from "../../redux/globalStates";
// import {
//   handleForgotPassword,
//   handleStoreUserEmail,
// } from "../../redux/AuthSlice";
// import useAbortApiCall from "../../hooks/useAbortApiCall";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/context/globalContext";
import useAbortApiCall from "@/hooks/useAbortApiCall";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleForgotPassword, handleStoreUserEmail } from "@/redux/AuthSlice";

const ForgotPasswordModal = () => {
  const forgotRef = useRef<HTMLFormElement>(null);

  const { t } = useTranslation();

  const signinSchema = yup.object({
    email: yup.string().email().required(t("email is required")).trim(),
  });

  const { handleChangeForgotPasswordModal, handleChangeOtpVerifyModal } =
    useGlobalContext();

  const { loading, user, error } = useAppSelector((state) => state.root.auth);

  const dispatch = useAppDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = (data: any) => {
    const { email } = data;
    const response = dispatch(
      handleForgotPassword({
        email,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("check your mails"), { duration: 4000 });
          dispatch(handleStoreUserEmail(getValues("email")));
          handleChangeForgotPasswordModal(false);
          handleChangeOtpVerifyModal(true);
        } else if (res?.payload?.status === "error") {
          toast.error(res?.payload?.message);
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      abortApiCall();
      window.document.body.style.overflow = "unset";
    };
  }, []);

  // useEffect(() => {
  //   if (showForgotPasswordModal) {
  //     window.document.body.style.overflow = "hidden";
  //   }
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       forgotRef.current instanceof HTMLFormElement &&
  //       !forgotRef.current.contains(event.target as Node) &&
  //       showForgotPasswordModal
  //     ) {
  //       handleChangeForgotPasswordModal(false);
  //       window.document.body.style.overflow = "unset";
  //       abortApiCall();
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };
  // }, [handleClickOutside, showForgotPasswordModal, forgotRef]);

  // function handleClickOutside(): void {
  //   handleChangeForgotPasswordModal(false);
  //   window.document.body.style.overflow = "unset";
  // }

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={forgotRef}
        className="absolute z-10 xl:w-1/3 md:w-1/2 w-11/12 h-auto md:p-7 p-2 rounded-lg bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 space-y-3"
      >
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-left md:text-lg capitalize">
            {t("Forgot password")}
          </p>
          <AiOutlineClose
            size={20}
            role="button"
            onClick={() => {
              handleChangeForgotPasswordModal(false);
            }}
          />
        </div>
        <p className="text-gray-400 text-sm">
          {t(
            "Please enter your username or email address. You will receive a link by email to create a new password."
          )}
        </p>
        <div>
          <label htmlFor="email" className="Label">
            {t("E-mail")}
          </label>
          <input
            type="email"
            className="input_field"
            placeholder="hello@gmail.com"
            {...register("email")}
          />
        </div>
        <span className="error">{errors?.email?.message}</span>

        <button type="submit" disabled={loading} className="blue_button w-full">
          {loading ? t("submitting").concat("...") : t("submit")}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordModal;
