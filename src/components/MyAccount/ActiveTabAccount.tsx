import React, { SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface ActiveTabAccountProps {
  activeComponent: String;
  setActiveComponent: (value: String) => void;
}

const ActiveTabAccount = ({
  activeComponent,
  setActiveComponent,
}: ActiveTabAccountProps) => {
  const { t } = useTranslation();
  return (
    <div className="border border-gray-300 bg-white md:space-y-3 space-y-2 xl:sticky top-36  z-0 xl:w-4/12 md:w-1/2 w-full">
      {/* title */}
      <p className="md:text-xl px-3 py-2">
        <b>{t("My Account")}</b>
      </p>
      <hr className="bg-gray-300" />
      <ul className="cursor-pointer">
        <li
          className={`${
            activeComponent === "profile"
              ? "bg-darkBlue text-white font-semibold"
              : "hover:bg-gray-200"
          } transition-all duration-[200ms] ease-in  font-medium px-4 py-2`}
          onClick={() => setActiveComponent("profile")}
        >
          {t("Profile")}
        </li>
        <li
          className={`${
            activeComponent === "addresses"
              ? "bg-darkBlue text-white font-semibold"
              : "hover:bg-gray-200"
          } transition-all duration-[200ms] ease-in  font-medium px-4 py-2`}
          onClick={() => setActiveComponent("addresses")}
        >
          {t("Addresses")}
        </li>
        <li
          className={`${
            activeComponent === "change_password"
              ? "bg-darkBlue text-white font-semibold"
              : "hover:bg-gray-200"
          } transition-all duration-[200ms] ease-in  font-medium px-4 py-2`}
          onClick={() => setActiveComponent("change_password")}
        >
          {t("Change Password")}
        </li>
      </ul>
      <hr className="bg-gray-300" />
      <p
        // onClick={handlelogout}
        className="text-red-500 capitalize font-semibold text-lg inline-block text-left cursor-pointer py-2 px-4"
      >
        {t("logout")}
      </p>
    </div>
  );
};

export default ActiveTabAccount;
