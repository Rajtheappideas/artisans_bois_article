"use client";
import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ValidationSchema from "@/validations/ValidationSchema";
import { handleChangePassword } from "@/redux/AuthSlice";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState<Boolean>(false);
  const [showNewPassword, setshowNewPassword] = useState<Boolean>(false);

  const { loading, token } = useAppSelector((state) => state.root.auth);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { changePasswordSchema } = ValidationSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = (data: any) => {
    const { oldPassword, newPassword } = data;
    const response = dispatch(
      handleChangePassword({
        oldPassword,
        newPassword,
        token,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("Password change successfully."), { duration: 4000 });
          toast.loading(t("Logout").concat("..."));
          setTimeout(() => {
            toast.remove();
            // dispatch(handleLogout());
            // dispatch(handleLogoutFromAllTabs());
          }, 2000);
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white border border-gray-300 md:p-4 p-2 md:space-y-5 space-y-3"
    >
      <p className="heading">{t("Change Password")}</p>
      {/* curr password */}
      <div className="space-y-2 relative">
        <label htmlFor="" className="Label">
          {t("Currnet password")}
        </label>
        <input
          type={showOldPassword ? "text" : "password"}
          placeholder="*******"
          className="w-full input_field"
          {...register("oldPassword")}
        />
        <button
          type="button"
          onClick={() => setShowOldPassword(!showOldPassword)}
          className="absolute top-1/2 -translate-y-[10%] cursor-pointer right-3 text-gray-600 rounded-full bg-white"
        >
          {showOldPassword ? (
            <BsEyeFill size={24} />
          ) : (
            <BsEyeSlashFill size={24} />
          )}
        </button>
        <span role="alert" className="error">
          {errors?.oldPassword?.message}
        </span>
      </div>
      {/* new password */}
      <div className="space-y-2 relative">
        <label htmlFor="" className="Label">
          {t("New password")}
        </label>
        <input
          type={showNewPassword ? "text" : "password"}
          placeholder="*******"
          className="w-full input_field"
          {...register("newPassword")}
        />
        <button
          type="button"
          onClick={() => setshowNewPassword(!showNewPassword)}
          className="absolute top-1/2 -translate-y-[20%] cursor-pointer right-3 text-gray-600 rounded-full bg-white"
        >
          {showOldPassword ? (
            <BsEyeFill size={24} />
          ) : (
            <BsEyeSlashFill size={24} />
          )}
        </button>
        <span role="alert" className="error">
          {errors?.newPassword?.message}
        </span>
      </div>
      {/* confirm password */}
      <div className="space-y-2">
        <label htmlFor="" className="Label">
          {t("confirm password")}
        </label>
        <input
          type="password"
          placeholder="*******"
          className="w-full input_field"
          {...register("confirmPassword")}
        />
        <span role="alert" className="error">
          {errors?.confirmPassword?.message}
        </span>
      </div>
      {/* btn */}
      <button
              disabled={loading}
        className="md:w-60 w-1/2 blue_button md:h-12"
      >
        {loading ? t("Saving").concat("...") : t("Save")}
      </button>
    </form>
  );
};

export default ChangePassword;
