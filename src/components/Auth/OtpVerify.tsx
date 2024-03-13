"use client";
import React, { FormEvent, useRef } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import { useTranslation } from "react-i18next";
import { handleForgotPassword, handleVerifyOtp } from "../../redux/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGlobalContext } from "@/context/globalContext";
import { AiOutlineClose } from "react-icons/ai";

type NumberFieldType = {
  stepOne: string | number;
  stepTwo: string | number;
  stepThree: string | number;
  stepFour: string | number;
  stepFive: string | number;
  stepSix: string | number;
};

const OTPVerify = () => {
  const [numberField, setNumberField] = useState<NumberFieldType>({
    stepOne: "",
    stepTwo: "",
    stepThree: "",
    stepFour: "",
    stepFive: "",
    stepSix: "",
  });

  const [resendOtpLoading, setResendOtpLoading] = useState(false);

  const { loading, email } = useAppSelector((state) => state.root.auth);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { abortApiCall } = useAbortApiCall();

  const { handleChangeResetPasswordModal, handleChangeOtpVerifyModal } =
    useGlobalContext();

  const handleOnChange = (
    fieldName: keyof NumberFieldType,
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setNumberField({ ...numberField, [fieldName]: value });
  };

  const handleInputFocus = (elmnt: any) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const handleSubmitVerfiyOtp = (e: FormEvent) => {
    e.preventDefault();
    function isStringKey(key: string): key is keyof NumberFieldType {
      return key in numberField;
    }
    if (Object.values(numberField).includes("")) {
      toast.remove();
      toast.error(t("please fill all the fields"));
      for (const key in numberField) {
        if (numberField.hasOwnProperty(key) && isStringKey(key)) {
          const element: string | number = numberField[key];
          if (element === "") {
            window?.document?.getElementById(key)?.focus();
            break; // Break after focusing on the first empty field
          }
        }
      }
      return true;
    }
    const response = dispatch(
      handleVerifyOtp({
        email,
        otp: Object.values(numberField).join(""),
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("OTP verified."));
          handleChangeResetPasswordModal(true);
          handleChangeOtpVerifyModal(false);
          resetValues();
        } else if (res?.payload?.status === "error") {
          toast.error(res?.payload?.message);
          resetValues();
        }
      });
    }
  };

  const handleResendOtp = () => {
    if (loading && resendOtpLoading) return true;
    setResendOtpLoading(true);
    const response = dispatch(
      handleForgotPassword({
        email,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("OTP Sent to your email"), { duration: 4000 });
          setResendOtpLoading(false);
        } else if (res?.payload?.status === "fail") {
          setResendOtpLoading(false);
        }
      });
    }
  };

  const resetValues = () => {
    setNumberField({
      stepOne: "",
      stepTwo: "",
      stepThree: "",
      stepFour: "",
      stepFive: "",
      stepSix: "",
    });
  };

  function onPaste(event: React.ClipboardEvent<HTMLFormElement>) {
    event.preventDefault();

    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      // Handle the case where clipboardData is null
      return;
    }

    const pasted = clipboardData.getData("text/plain");
    const code = pasted.split("");

    const steps = [
      { stepOne: "" },
      { stepTwo: "" },
      { stepThree: "" },
      { stepFour: "" },
      { stepFive: "" },
      { stepSix: "" },
    ];

    const obj = steps.map((val, index) => ({
      [Object.keys(val)[0]]: code[index],
    }));
    const otpObject = obj.reduce((result, currentObject) => {
      const key = Object.keys(currentObject)[0];
      const value = currentObject[key];
      result[key] = value;
      return result;
    }, {});

    setNumberField(otpObject as NumberFieldType);
  }

  useEffect(() => {
    window?.document?.getElementById("stepOne")?.focus();
    return () => {
      abortApiCall();
      window.document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50">
      {/* title */}
      {/* {error !== null && <span className="error">{error?.message}</span>} */}
      <div className="absolute z-10 xl:w-1/3 md:w-1/2 w-11/12 h-auto md:p-5 p-2 rounded-lg bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 space-y-3">
        <div className="space-y-2 text-center relative">
          <p className="font-semibold text-darkBlue text-center md:text-lg text-base capitalize">
            {t("verification")}
          </p>
          <p className="text-sm text-darkGray leading-normal font-medium">
            {t("check your email for the OTP")}
          </p>
          <AiOutlineClose
            size={20}
            role="button"
            onClick={() => {
              handleChangeOtpVerifyModal(false);
            }}
            className="absolute right-0 top-0"
          />
        </div>
        {/* form  */}
        <form
          className="md:space-y-5 space-y-2 w-full text-center"
          onSubmit={(e) => handleSubmitVerfiyOtp(e)}
          onPaste={onPaste}
        >
          {/* otp boxes */}
          <div className="flex w-full items-center justify-center md:gap-3 gap-1">
            <input
              type="number"
              className="otp_Field"
              onChange={(e) => {
                handleOnChange(
                  "stepOne",
                  e.target.value.length > 1
                    ? e.target.value.slice(-1)
                    : e.target.value.trim(),
                  e
                );
              }}
              value={numberField?.stepOne}
              onKeyUp={(e) => handleInputFocus(e)}
              autoComplete="off"
              tabIndex={1}
              min="0"
              max="9"
              maxLength={1}
              name="stepOne"
              id="stepOne"
            />
            <input
              type="number"
              className="otp_Field"
              onChange={(e) =>
                handleOnChange(
                  "stepTwo",
                  e.target.value.length > 1
                    ? e.target.value.slice(-1)
                    : e.target.value.trim(),
                  e
                )
              }
              onKeyUp={(e) => handleInputFocus(e)}
              autoComplete="off"
              tabIndex={2}
              min="0"
              max="9"
              value={numberField?.stepTwo}
              name="stepTwo"
              maxLength={1}
              id="stepTwo"
            />
            <input
              type="number"
              className="otp_Field"
              onChange={(e) =>
                handleOnChange(
                  "stepThree",
                  e.target.value.length > 1
                    ? e.target.value.slice(-1)
                    : e.target.value.trim(),
                  e
                )
              }
              onKeyUp={(e) => handleInputFocus(e)}
              autoComplete="off"
              tabIndex={3}
              min="0"
              max="9"
              name="stepThree"
              id="stepThree"
              maxLength={1}
              value={numberField?.stepThree}
            />
            <input
              type="number"
              className="otp_Field"
              onChange={(e) =>
                handleOnChange(
                  "stepFour",
                  e.target.value.length > 1
                    ? e.target.value.slice(-1)
                    : e.target.value.trim(),
                  e
                )
              }
              onKeyUp={(e) => handleInputFocus(e)}
              autoComplete="off"
              tabIndex={4}
              min="0"
              max="9"
              name="stepFour"
              id="stepFour"
              maxLength={1}
              value={numberField?.stepFour}
            />
            <input
              type="number"
              className="otp_Field"
              onChange={(e) =>
                handleOnChange(
                  "stepFive",
                  e.target.value.length > 1
                    ? e.target.value.slice(-1)
                    : e.target.value.trim(),
                  e
                )
              }
              onKeyUp={(e) => handleInputFocus(e)}
              autoComplete="off"
              tabIndex={5}
              min="0"
              max="9"
              name="stepFive"
              id="stepFive"
              maxLength={1}
              value={numberField?.stepFive}
            />
            <input
              type="number"
              className="otp_Field"
              onChange={(e) =>
                handleOnChange(
                  "stepSix",
                  e.target.value.length > 1
                    ? e.target.value.slice(-1)
                    : e.target.value.trim(),
                  e
                )
              }
              onKeyUp={(e) => handleInputFocus(e)}
              autoComplete="off"
              tabIndex={6}
              min="0"
              max="9"
              name="stepSix"
              id="stepSix"
              maxLength={1}
              value={numberField?.stepSix}
            />
          </div>

          {/* resend code */}
          <p className="text-teclborder-textColor text-sm">
            {t("Didn’t recive a verification code")}? <br />
            <span
              onClick={() => handleResendOtp()}
              className="text-red-500 font-semibold cursor-pointer "
            >
              {resendOtpLoading
                ? t("sending").concat("...")
                : t("Resend the code")}
            </span>{" "}
          </p>
          {/* butons */}
          <button
            type="submit"
            disabled={loading || resendOtpLoading}
            className={`blue_button w-full md:h-12 h-10 
                ${loading && "cursor-not-allowed"}`}
          >
            {loading && !resendOtpLoading
              ? t("Verifying").concat("...")
              : t("Continue")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerify;
