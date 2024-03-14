import {
  handleApplyPromoCode,
  handleCalculateTotal,
  handleChangePromoCode,
  handleChangePromoCodeDiscount,
  handleRemovePromoCode,
} from "@/redux/CheckoutSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AiOutlineClose } from "react-icons/ai";

interface OrderSummaryProps {
  setActiveComponent: (val: string) => void;
  activeComponent: string;
  setClientSecret?: (val: string) => void;
  onSubmit?: () => void;
  errors?: {};
  handleCreateOrder?: () => void;
  loading?: boolean;
}

const OrderSummary = ({
  setActiveComponent,
  activeComponent,
  onSubmit,
  errors,
  handleCreateOrder,
  loading,
}: OrderSummaryProps) => {
  const { token, addresses } = useAppSelector((state) => state.root.auth);
  const {
    getSubsciptionDetailsLoading,
    subscriptionDetails,
    isPromoCodeApplied,
    promoCode,
    promoCodeLoading,
    promoCodeDiscount,
    subTotal,
    total,
    checkoutLoading,
  } = useAppSelector((state) => state.root.checkout);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (activeComponent === "checkout_form") {
      if (errors && Object.values(errors).length > 0) {
        return toast.error("Fill all required fields.");
      }
      return onSubmit && onSubmit();
    } else {
      handleCreateOrder && handleCreateOrder();
    }
  };

  const handleApplyPromocodeFunction = () => {
    toast.remove();
    if (!promoCode) return toast.error("Enter a promo code.");
    const response = dispatch(
      handleApplyPromoCode({
        code: promoCode,
        token,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(res?.payload?.message);
          calculatePromoCodeDiscount(res?.payload?.promoCode);
          dispatch(handleCalculateTotal());
        } else {
          //   setPromoCodeText("");
        }
      });
    }
  };

  const handleRemovePromoCodeFunction = () => {
    dispatch(handleRemovePromoCode());
    toast.success("Promo code removed");
  };

  function calculatePromoCodeDiscount(code: any) {
    if (!code) return;
    dispatch(
      handleChangePromoCodeDiscount((code?.discountPercentage * subTotal) / 100)
    );
    return (code?.discountPercentage * subTotal) / 100;
  }

  return (
    <div className="border border-gray-300 md:space-y-3 space-y-2 xl:sticky top-36 z-0 xl:w-3/12 md:w-1/2 w-full ml-auto">
      {/* title */}
      <p className="md:text-xl p-2">
        <b>{t("My order")}</b>
      </p>
      <hr />
      {/* order details */}
      <div className="p-2 md:space-y-5 space-y-3">
        {!getSubsciptionDetailsLoading && subscriptionDetails ? (
          <div className="flex items-start justify-between md:text-base text-sm">
            <div className="w-2/3">
              <p>
                <b>{subscriptionDetails?.title}</b>
              </p>
              <p className="md:text-base text-sm break-words">
                {t("Quantity")}: 1
              </p>
            </div>
            <p className="font-medium w-1/3 text-right break-words">
              €{" "}
              {Intl.NumberFormat("fr-FR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }).format(subscriptionDetails?.priceDigital)}
            </p>
          </div>
        ) : (
          <div className="skeleton_loading" />
        )}
      </div>
      <hr />
      <div className="w-full flex items-center gap-2 px-1">
        <input
          type="text"
          placeholder="Enter promo code"
          className=" w-1/2 input_field"
          onChange={(e) => dispatch(handleChangePromoCode(e.target.value))}
          value={promoCode || ""}
        />
        <button
          className="blue_button"
          disabled={promoCodeLoading || isPromoCodeApplied}
          onClick={() => handleApplyPromocodeFunction()}
        >
          {promoCodeLoading
            ? "Applying..."
            : isPromoCodeApplied
            ? "Applied"
            : "Apply"}
        </button>
        {isPromoCodeApplied && (
          <AiOutlineClose
            role="button"
            title="remove promo code"
            className="w-8 h-8"
            onClick={() => handleRemovePromoCodeFunction()}
          />
        )}
      </div>
      <hr />
      {/* total + subtotal + tax */}
      <div className="px-2 space-y-2">
        {/* sub total */}
        <div className="flex items-center justify-between">
          <p className="w-1/2">
            <b>{t("Sub Total")}</b>
          </p>
          <p className="break-words w-1/2 text-right">
            € &nbsp;
            {Intl.NumberFormat("fr-FR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }).format(subTotal)}
          </p>
        </div>

        {/* promo code */}
        {isPromoCodeApplied && (
          <div className="flex items-center justify-between">
            <p className="w-1/2">
              <b>{t("PromoCode")}</b>
            </p>
            <p className="break-words w-1/2 text-right">
              € &nbsp; -
              {Intl.NumberFormat("fr-FR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }).format(promoCodeDiscount)}
            </p>
          </div>
        )}
        <hr />
        {/* tax show if france is country */}
        <div className="flex items-center justify-between">
          <p className="w-1/2">
            {addresses?.shippingAddress?.country.toLocaleLowerCase() ===
              "france" && <p>{t("Total without tax")}</p>}
          </p>
          {addresses?.shippingAddress?.country.toLocaleLowerCase() ===
            "france" && (
            <p className="break-words w-1/2 text-right">
              € &nbsp;
              {Intl.NumberFormat("fr-FR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }).format(Math.abs((total * 2.1) / 100 - total))}
            </p>
          )}
        </div>
        {/* total */}
        <div className="flex items-center justify-between">
          <p className="w-1/2">
            <b>{t("Total")}</b>
          </p>
          <p className="break-words w-1/2 text-right">
            <b>
              € &nbsp;
              {Intl.NumberFormat("fr-FR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }).format(total)}
            </b>
          </p>
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
          disabled={checkoutLoading || loading}
          className="capitalize w-full blue_button md:h-12 font-semibold"
          type="button"
        >
          {activeComponent === "checkout_form"
            ? checkoutLoading
              ? "Submitting Details..."
              : "continue"
            : checkoutLoading || loading
            ? "Processing..."
            : "Checkout"}
        </button>
        {activeComponent === "payment_method" && (
          <button
            onClick={() => setActiveComponent("checkout_form")}
            className="capitalize w-full black_button md:h-12 font-semibold"
            disabled={checkoutLoading||loading}
          >
            {t("back")}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
