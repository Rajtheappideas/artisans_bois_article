"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";
import useAbortApiCall from "@/hooks/useAbortApiCall";
import CheckoutForm from "@/components/Checkout/CheckOutForm";
import PaymentMethod from "@/components/Checkout/PaymentMethod";
import { handleGetSubscriptionDetails } from "@/redux/CheckoutSlice";
import Success from "@/components/Success";
import toast from "react-hot-toast";
import { handleGetUserAddress } from "@/redux/AuthSlice";

const Checkout = () => {
  const [activeComponent, setActiveComponent] =
    useState<string>("checkout_form");
  const [clientSecret, setClientSecret] = useState<string>(
    "pi_3O0iJRIEhdCVsY1P0Vh7NViH_secret_xV9tyPc7JtGcQULL2Dh2Ckor6"
  );
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  const { user, token } = useAppSelector((state) => state.root.auth);

  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const { abortApiCall } = useAbortApiCall();

  const { t } = useTranslation();

  const { checkAuth } = useAuthCheck();

  useEffect(() => {
    checkAuth();
    if (
      user &&
      user?.remainingIssues &&
      (user?.remainingIssues >= 0 || user?.remainingIssues)
    ) {
      navigate.push("/");
      toast("you have active subscription.");
    }
    dispatch(handleGetUserAddress({ token }));
    dispatch(handleGetSubscriptionDetails());
    return () => abortApiCall();
  }, []);

  useEffect(() => {
    if (
      user !== null &&
      clientSecret !==
        "pi_3O0iJRIEhdCVsY1P0Vh7NViH_secret_xV9tyPc7JtGcQULL2Dh2Ckor6"
    ) {
      const fetchStripe = async () => {
        try {
          const stripe = await loadStripe(
            // "pk_live_51NptSmIEhdCVsY1P48BRPHzl6zLtOviR1wQ3ORciNmzuGjAvnqSL49J3fmbY4DwbY7jslIHAmk56OKbANXkqGHOU00OitBOK0D"
            // "pk_test_51NptSmIEhdCVsY1PKguV4Vbif5Kf10YVWTAIYi9H5wLiTbMLvejHyAHvlXJOGbnNtQbIjF9u6R7W8tfNKA8yJ0Fn008z2nS1tE"
            process.env.NEXT_PUBLIC_STRIPE_KEY as string
          );
          setStripePromise(stripe);
        } catch (error) {
          console.error("Error loading Stripe:", error);
        }
      };
      fetchStripe();
    }
  }, [clientSecret]);

  return (
    <>
      <div className="Container lg:py-10 py-5 md:space-y-5 space-y-3">
        {activeComponent === "success" && <Success />}
        {activeComponent !== "success" && (
          <div className="w-full flex xl:flex-row flex-col items-start lg:gap-6 gap-3">
            {activeComponent === "checkout_form" && (
              <CheckoutForm
                setActiveComponent={setActiveComponent}
                activeComponent={activeComponent}
                setClientSecret={setClientSecret}
              />
            )}
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
              }}
              key={clientSecret}
            >
              {activeComponent === "payment_method" &&
                stripePromise &&
                clientSecret && (
                  <PaymentMethod
                    setActiveComponent={setActiveComponent}
                    activeComponent={activeComponent}
                    clientSecret={clientSecret}
                  />
                )}
            </Elements>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
