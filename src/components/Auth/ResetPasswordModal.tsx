"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AiOutlineClose } from "react-icons/ai";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { handleResetPassword } from "@/redux/AuthSlice";
import ValidationSchema from "@/validations/ValidationSchema";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import useAbortApiCall from "@/hooks/useAbortApiCall";
import { useGlobalContext } from "@/context/globalContext";

const ResetPasswordModal = () => {
  const [showPassword, setShowPassword] = useState(false);

  const resetRef = useRef(null);

  const { t } = useTranslation();

  const { loading, email, verifyToken } = useAppSelector(
    (state) => state.root.auth
  );

  const { ResetPasswordSchema } = ValidationSchema();

  const dispatch = useAppDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const { handleChangeResetPasswordModal } = useGlobalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onSubmit = (data: any) => {
    const { password } = data;

    const response = dispatch(
      handleResetPassword({
        email,
        password,
        verifyToken,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("password Reset successfully"));
          handleChangeResetPasswordModal(false);
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
  //   if (showResetPassword) {
  //     window.document.body.style.overflow = "hidden";
  //   }
  //   const handleClickOutside = (event) => {
  //     if (
  //       resetRef.current &&
  //       !resetRef.current.contains(event?.target) &&
  //       showResetPassword
  //     ) {
  //       dispatch(handleChangeShowResetPassword(false));
  //       window.document.body.style.overflow = "unset";
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };
  // }, [handleClickOutside, showResetPassword]);

  // function handleClickOutside() {
  //   //     dispatch(handleChangeShowResetPassword(false));
  //   window.document.body.style.overflow = "unset";
  // }

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={resetRef}
        className="absolute z-10 xl:w-1/3 md:w-1/2 w-11/12 h-auto md:p-7 p-2 rounded-lg bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 space-y-3"
      >
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-left md:text-lg">
            {t("Reset Password")}
          </p>
          <AiOutlineClose
            size={20}
            role="button"
            onClick={() => {
              handleChangeResetPasswordModal(false);
            }}
          />
        </div>

        <div className="relative h-20">
          <label htmlFor="password" className="Label">
            {t("Password")}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="input_field"
            placeholder="********"
            {...register("password")}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <BsEyeFill
                size={24}
                className="absolute md:top-[60%] top-1/2 -translate-y-1/2 cursor-pointer right-3 text-gray-400"
              />
            ) : (
              <BsEyeSlashFill
                size={24}
                className="absolute md:top-[60%] top-1/2 -translate-y-1/2 cursor-pointer right-3 text-gray-400"
              />
            )}
          </button>
        </div>
        <span className="error">{errors?.password?.message}</span>
        <div>
          <label htmlFor="confirmPassword" className="Label">
            {t("Confirm Password")}
          </label>
          <input
            type="password"
            className="input_field"
            placeholder="********"
            {...register("confirmPassword")}
          />
          <span className="error">{errors?.confirmPassword?.message}</span>
        </div>
        <button type="submit" disabled={loading} className="blue_button w-full">
          {loading ? t("Submitting").concat("...") : t("Submit")}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordModal;
