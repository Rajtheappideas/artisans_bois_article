"use client";
import { useGlobalContext } from "@/context/globalContext";
import { handleGetUserAddress, handleLoginUser } from "@/redux/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AiOutlineClose } from "react-icons/ai";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import * as yup from "yup";

const LoginModal = () => {
  const [showPassword, setshowPassword] = useState(false);

  const {
    handleChangeLoginModal,
    showLoginModal,
    handleChangeForgotPasswordModal,
    handleChangeRegisterModal,
  } = useGlobalContext();

  const { loading } = useAppSelector((state) => state.root.auth);

  const { t } = useTranslation();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const dispatch = useAppDispatch();
  const signinRef = useRef<HTMLFormElement>(null);

  const signinSchema = yup.object({
    email: yup.string().email().required(t("email is required")).trim(),
    password: yup.string().required(t("password is required")).trim(),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    const response = dispatch(
      handleLoginUser({
        email,
        password,
      })
    );
    if (response) {
      response
        .then((res) => {
          if (res?.payload?.status === "success") {
            toast.success(t("sign in successfully"));
            dispatch(handleGetUserAddress({ token: res?.payload?.token }));
            handleChangeLoginModal(false);
            window?.location?.reload()
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (showLoginModal) {
      window.document.body.style.overflow = "hidden";
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        signinRef.current instanceof HTMLFormElement &&
        !signinRef.current.contains(event.target as Node) &&
        showLoginModal
      ) {
        handleChangeLoginModal(false);
        window.document.body.style.overflow = "unset";
        abortApiCall();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, showLoginModal, signinRef]);

  function handleClickOutside(): void {
    handleChangeLoginModal(false);
    window.document.body.style.overflow = "unset";
  }

  useEffect(() => {
    return () => {
      abortApiCall();
      window.document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={signinRef}
        className="fixed z-10 xl:w-1/3 md:w-1/2 w-11/12 h-auto md:p-8 p-2 rounded-lg bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 space-y-3"
      >
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-left md:text-lg">
            {/* {t("Login to your account")} */}
            Login to your account
          </p>
          <AiOutlineClose
            size={20}
            role="button"
            onClick={() => {
              handleChangeLoginModal(false);
            }}
          />
        </div>
        <div>
          <label htmlFor="email" className="Label">
            {/* {t("E-mail")} */}
            E-mail
          </label>
          <input
            type="email"
            className="input_field"
            placeholder="hello@gmail.com"
            {...register("email")}
          />
          <span className="error">{errors?.email?.message}</span>
        </div>
        <div className="relative h-24">
          <label htmlFor="password" className="Label">
            {/* {t("Password")} */}
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="input_field"
            placeholder="********"
          />
          <button type="button" onClick={() => setshowPassword(!showPassword)}>
            {showPassword ? (
              <BsEyeFill
                size={24}
                className="absolute top-1/2 -translate-y-1/2 cursor-pointer right-3 text-gray-400"
              />
            ) : (
              <BsEyeSlashFill
                size={24}
                className="absolute top-1/2 -translate-y-1/2 cursor-pointer right-3 text-gray-400"
              />
            )}
          </button>
          <span className="error">{errors?.password?.message}</span>
        </div>
        <button type="submit" disabled={loading} className="blue_button w-full">
          {loading ? t("loading").concat("...") : t("login")}
        </button>
        <p className="text-center font-medium ">
          <span
            className="cursor-pointer"
            onClick={() => {
              handleChangeForgotPasswordModal(true);
              handleChangeLoginModal(false);
            }}
          >
            {/* {t("Forgot password")}? */}
            Forgot password
          </span>
        </p>
        <p className="text-center">
          {/* {t("Don't have an account")}?{" "} */}
          Dont have an account ?{" "}
          <span
            onClick={() => {
              handleChangeRegisterModal(true);
              handleChangeLoginModal(false);
            }}
            className="text-darkBlue font-semibold cursor-pointer"
          >
            {/* {t("Register Now")}! */}
            Register now
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginModal;
