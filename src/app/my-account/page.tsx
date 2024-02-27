"use client";
import ActiveTabAccount from "@/components/MyAccount/ActiveTabAccount";
import Address from "@/components/MyAccount/Addresses";
import ChangePassword from "@/components/MyAccount/ChangePassword";
import Profile from "@/components/MyAccount/Profile";
import React, { useState } from "react";

const MyAccount = () => {
  const [activeComponent, setActiveComponent] = useState<String>("profile");

  return (
    <div className="container xl:px-3 lg:px-10 md:px-5 px-3 mx-auto py-10 md:space-y-8 space-y-5 mb-20 xl:w-9/12 w-full">
      <div className="flex items-start gap-5 xl:flex-row flex-col">
        <ActiveTabAccount
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        <div className="xl:w-8/12 w-full">
          {activeComponent === "profile" && <Profile />}
          {activeComponent === "addresses" && <Address />}
          {activeComponent === "change_password" && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
