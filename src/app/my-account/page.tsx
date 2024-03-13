"use client";
import ActiveTabAccount from "@/components/MyAccount/ActiveTabAccount";
import Address from "@/components/MyAccount/Addresses";
import ChangePassword from "@/components/MyAccount/ChangePassword";
import Profile from "@/components/MyAccount/Profile";
import useAuthCheck from "@/hooks/useAuthCheck";
import { handleChangeAddress } from "@/redux/AuthSlice";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const MyAccount = () => {
  const [activeComponent, setActiveComponent] = useState<String>("profile");
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAppSelector((s) => s.root.auth);

  const dispatch = useDispatch();

  const { checkAuth } = useAuthCheck();

  async function handleGetUserAddress() {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://boisnewsmedia.onrender.com/api/user/address",
        { headers: { Authorization: token } }
      );
      dispatch(
        handleChangeAddress({
          billingAddress: data?.billingAddress,
          shippingAddress: data?.shippingAddress,
        })
      );
      setLoading(false);
      return data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
    handleGetUserAddress();
  }, []);

  return (
    <div className="container xl:px-3 lg:px-10 md:px-5 px-3 mx-auto py-10 md:space-y-8 space-y-5 mb-20 xl:w-9/12 w-full">
      <div className="flex items-start gap-5 xl:flex-row flex-col">
        <ActiveTabAccount
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        <div className="xl:w-8/12 w-full">
          {activeComponent === "profile" && <Profile />}
          {activeComponent === "addresses" && <Address loading={loading} />}
          {activeComponent === "change_password" && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
