"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [showEditProfile, setShowEditProfile] = useState<Boolean>(false);

  let loading = false;
  const { t } = useTranslation();

  return (
    <>
      {loading ? (
        <div className="loading">{t("Loading").concat("...")}</div>
      ) : (
        <>
          {showEditProfile ? (
            <EditProfile setShowEditProfile={setShowEditProfile} />
          ) : (
            <div className="md:space-y-3 space-y-2 md:p-5 p-2 w-full border bg-white border-gray-300">
              <p className="heading text-lg md:text-left text-center">
                {t("Profile")}
              </p>
              {/* name */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("Name")}:{" "}
                </div>
                <div className="flex-1">
                  {/* {user?.fname ?? "-"} {user?.lname} */}
                  First name last name
                </div>
              </div>
              {/* emaail */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("Email")}:
                </div>
                {/* <div className="flex-1">{user?.email ?? "-"}</div> */}
                email
              </div>
              {/* phone */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("phone")}:{" "}
                </div>
                {/* <div className="flex-1">{user?.phone}</div> */}
                phone
              </div>
              {/* mobile */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("mobile")}:{" "}
                </div>
                {/* <div className="flex-1">{user?.mobile ?? "-"}</div> */}
                mobile
              </div>
              {/* civility */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {"civlity"}:{" "}
                </div>
                {/* <div className="flex-1">{user?.civility ?? "-"}</div> */}
                civility
              </div>
              {/* address */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("address")}:{" "}
                </div>
                <div className="flex-1">
                  {/* {user?.shippingAddress?.address1 ?? "-"} */}
                  address 1
                </div>
              </div>
              {/* province */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("province")}:{" "}
                </div>
                <div className="flex-1">
                  {/* {user?.shippingAddress?.province === "" || undefined
                    ? "-"
                    : user?.shippingAddress?.province} */}
                  shipping province
                </div>
              </div>
              {/* country */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("country")}:{" "}
                </div>
                <div className="flex-1">
                  {/* {user?.shippingAddress?.country ?? "-"} */}
                  shipping country
                </div>
              </div>
              {/* city */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {"city"}:{" "}
                </div>
                <div className="flex-1">
                  {/* {user?.shippingAddrsess?.city ?? "-"} */}
                  shipping city
                </div>
              </div>
              {/* postal code */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("postal code")}:
                </div>
                <div className="flex-1">
                  {/* {user?.shippingAddress?
                        shi.zipCode ?? "-"} */}
                  shipping zipcode
                </div>
              </div>
              {/* btn */}
              <div className="md:text-left text-center">
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="blue_button font-semibold md:h-12 md:w-40"
                >
                  {t("Edit Profile")}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
