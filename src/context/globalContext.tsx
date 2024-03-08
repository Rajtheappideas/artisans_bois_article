"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

type globalContextType = {
  showLoginModal: boolean;
  showRegisterModal: boolean;
  showForgotPasswordModal: boolean;
  showResetPasswordModal: boolean;
  showSearchModal: boolean;
  showOtpVerifyModal: boolean;
  handleChangeLoginModal: (show: boolean) => void;
  handleChangeRegisterModal: (show: boolean) => void;
  handleChangeForgotPasswordModal: (show: boolean) => void;
  handleChangeSearchModal: (show: boolean) => void;
  handleChangeResetPasswordModal: (show: boolean) => void;
  handleChangeOtpVerifyModal: (show: boolean) => void;
};

type Props = {
  children: ReactNode;
};

const initialState: globalContextType = {
  showLoginModal: false,
  showRegisterModal: false,
  showForgotPasswordModal: false,
  showSearchModal: false,
  showResetPasswordModal: false,
  showOtpVerifyModal: false,
  handleChangeLoginModal: () => {},
  handleChangeRegisterModal: () => {},
  handleChangeForgotPasswordModal: () => {},
  handleChangeResetPasswordModal: () => {},
  handleChangeSearchModal: () => {},
  handleChangeOtpVerifyModal: () => {},
};

export const GlobalContext = createContext<globalContextType>(initialState);

export const GlobalContextProvider = ({ children }: Props) => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] =
    useState<boolean>(false);
  const [showResetPasswordModal, setShowResetPasswordModal] =
    useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showOtpVerifyModal, setShowOtpVerifyModal] = useState<boolean>(false);

  const handleChangeLoginModal = (show: boolean) => {
    setShowLoginModal(show);
  };

  const handleChangeRegisterModal = (show: boolean) => {
    setShowRegisterModal(show);
  };

  const handleChangeForgotPasswordModal = (show: boolean) => {
    setShowForgotPasswordModal(show);
  };

  const handleChangeResetPasswordModal = (show: boolean) => {
    setShowResetPasswordModal(show);
  };

  const handleChangeSearchModal = (show: boolean) => {
    setShowSearchModal(show);
  };

  const handleChangeOtpVerifyModal = (show: boolean) => {
    setShowOtpVerifyModal(show);
  };

  const values = {
    showLoginModal,
    showRegisterModal,
    showForgotPasswordModal,
    showResetPasswordModal,
    showSearchModal,
    showOtpVerifyModal,
    handleChangeLoginModal,
    handleChangeRegisterModal,
    handleChangeForgotPasswordModal,
    handleChangeResetPasswordModal,
    handleChangeSearchModal,
    handleChangeOtpVerifyModal,
  };

  return (
    <>
      <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
    </>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
