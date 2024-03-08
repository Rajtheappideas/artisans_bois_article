"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BillingAddress from "./BillingAddress";
import EditBillingAddress from "./EditBillingAddress";
import DeliveryAddress from "./DeliveryAddress";
import EditDeliveryAddress from "./EditDeliveryAddress";
import { useAppSelector } from "@/redux/hooks";
import { Address } from "@/types";

const Address = () => {
  const [activeAddress, setActiveAddress] = useState<string>("");
  const [activeEditAddress, setActiveEditAddress] = useState<string>("");

  const { t } = useTranslation();

  const { addresses, addressLoading ,loading} = useAppSelector((s) => s.root.auth);

  return (
    <>
      {loading ? (
        <div className="loading">{t("Loading").concat("...")}</div>
      ) : (
        <>
          {activeAddress === "billing" && (
            <BillingAddress setActiveAddress={setActiveAddress} />
          )}
          {activeEditAddress === "billing" && (
            <EditBillingAddress setActiveEditAddress={setActiveEditAddress} />
          )}
          {activeAddress === "delivery" && (
            <DeliveryAddress setActiveAddress={setActiveAddress} />
          )}
          {activeEditAddress === "delivery" && (
            <EditDeliveryAddress setActiveEditAddress={setActiveEditAddress} />
          )}

          {activeAddress === "" && activeEditAddress === "" && (
            <div className="w-full grid md:grid-cols-2 place-items-start items-start gap-4">
              {/* billing address */}
              {addresses !== null &&
              Object.values(addresses?.billingAddress as Address).length > 0 ? (
                <div className="space-y-2 w-full">
                  <p className="heading">{t("Billing address")}</p>
                  <div className="w-full md:p-4 p-2  border border-gray-300 space-y-2">
                    <p>
                      {addresses?.billingAddress?.zipCode}, <br />
                      {addresses?.billingAddress?.address1}, <br />
                      {addresses?.billingAddress?.address2 &&
                        addresses?.billingAddress?.address2}
                      {addresses?.billingAddress?.address2 && (
                        <>
                          ,<br />
                        </>
                      )}
                      {addresses?.billingAddress?.address3 &&
                        addresses?.billingAddress?.address3}
                      {addresses?.billingAddress?.address3 && (
                        <>
                          ,<br />
                        </>
                      )}
                      {addresses?.billingAddress?.city}, <br />
                      {addresses?.billingAddress?.province}, <br />
                      {addresses?.billingAddress?.country}, <br />
                    </p>
                    <button
                      onClick={() => setActiveEditAddress("billing")}
                      className="capitalize blue_button md:w-48 w-full"
                    >
                      {t("modify")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-3">
                  <p className="heading">{t("Billing address")}</p>
                  <div className="flex gap-3 bg-white md:h-60 h-40 w-full items-center justify-center flex-col border border-gray-300">
                    <button
                      className="w-1/2 uppercase blue_button"
                      onClick={() => setActiveAddress("billing")}
                    >
                      {t("add")}
                    </button>

                    <p className="text-center">
                      {t("You have not yet defined this type of address")}.
                    </p>
                  </div>
                </div>
              )}

              {/* delivery address */}
              {addresses !== null &&
              Object.values(addresses?.shippingAddress as Address).length >
                0 ? (
                <div className="space-y-2 w-full">
                  <p className="heading">{t("Shipping address")}</p>
                  <div className="w-full md:p-4 p-2  border border-gray-300 space-y-2">
                    <p>
                      {addresses?.shippingAddress?.zipCode}, <br />
                      {addresses?.shippingAddress?.address1}, <br />
                      {addresses?.shippingAddress?.address2 &&
                        addresses?.shippingAddress?.address2}
                      {addresses?.shippingAddress?.address2 && (
                        <>
                          ,<br />
                        </>
                      )}
                      {addresses?.shippingAddress?.address3 &&
                        addresses?.shippingAddress?.address3}
                      {addresses?.shippingAddress?.address3 && (
                        <>
                          ,<br />
                        </>
                      )}
                      {addresses?.shippingAddress?.city}, <br />
                      {addresses?.shippingAddress?.province}, <br />
                      {addresses?.shippingAddress?.country}, <br />
                    </p>
                    <button
                      onClick={() => setActiveEditAddress("delivery")}
                      className="capitalize blue_button md:w-48 w-full"
                    >
                      {t("modify")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-3 ">
                  <p className="heading">{t("Delivery address")}</p>
                  <div className="flex gap-3 bg-white w-full md:h-60 h-40 items-center justify-center flex-col border border-gray-300">
                    <button
                      className="w-1/2 uppercase blue_button"
                      onClick={() => setActiveAddress("delivery")}
                    >
                      {t("add")}
                    </button>

                    <p className="text-center">
                      {t("You have not yet defined this type of address")}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Address;
