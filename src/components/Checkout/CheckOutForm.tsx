import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ValidationSchema from "../../validations/ValidationSchema";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Country, State } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import OrderSummary from "./OrderSummary";
import toast from "react-hot-toast";
import { handleChangeUserAddress } from "../../redux/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CountryType, StateType } from "@/types";
import { handleCreatePaymentIntent } from "@/redux/CheckoutSlice";

interface CheckoutFormProps {
  setActiveComponent: (val: string) => void;
  activeComponent: string;
  setClientSecret: (val: string) => void;
}

const CheckoutForm = ({
  setActiveComponent,
  activeComponent,
  setClientSecret,
}: CheckoutFormProps) => {
  const [showShippingAddressFields, setShowShippingAddressFields] =
    useState(false);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [statesForBilling, setStatesForBilling] = useState<StateType[]>([]);
  const [statesForShipping, setStatesForShipping] = useState<StateType[]>([]);
  const [selectedCountryForBilling, setSelectedCountryForBilling] =
    useState("");
  const [selectedCountryForShipping, setSelectedCountryForShipping] =
    useState<string>("");
  const [showShippingStateField, setShowShippingStateField] = useState(false);
  const [showBillingStateField, setShowBillingStateField] = useState(false);

  const { addresses, token, user, addressLoading } = useAppSelector(
    (state) => state.root.auth
  );
  const { promoCode, checkoutLoading } = useAppSelector(
    (state) => state.root.checkout
  );

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const { checkoutSchema } = ValidationSchema(
    showBillingStateField,
    showShippingStateField,
    showShippingAddressFields
  );

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    watch,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      billingAddress1: addresses?.billingAddress?.address1,
      billingzipCode: addresses?.billingAddress?.zipCode,
      billingProvince: addresses?.billingAddress?.province,
      billingcountry: addresses?.billingAddress?.country,
      billingcity: addresses?.billingAddress?.city,
      billingFname: user?.fname,
      billingLname: user?.lname,
      billingCompanyName: user?.company,
      shippingAddress1: "",
      shippingzipCode: "",
      shippingProvince: "",
      shippingcountry: "",
      shippingcity: "",
      shippingFname: "",
      shippingLname: "",
      phone: user?.phone as string,
      email: user?.email,
      shippingCompanyName: "",
      VAT: "",
      purchaseOrder: "",
      //       fieldOfActivity: "",
      orderNotes: "",
    },
  });

  const onSubmit = (data: any) => {
    const {
      billingAddress1,
      shippingAddress1,
      billingcity,
      shippingcity,
      billingCompanyName,
      shippingCompanyName,
      billingcountry,
      shippingcountry,
      billingzipCode,
      shippingzipCode,
      shippingFname,
      billingFname,
      shippingLname,
      billingLname,
      shippingProvince,
      billingProvince,
      phone,
      email,
      VAT,
      purchaseOrder,
      orderNotes,
    } = data;

    if (Object.values(errors).length > 0) return;
    let shippingAddress = {
      fname: shippingFname,
      lname: shippingLname,
      address1: shippingAddress1,
      zipCode: shippingzipCode,
      city: shippingcity,
      province: shippingProvince,
      country: shippingcountry,
      companyName: shippingCompanyName,
    };

    let billingAddress = {
      fname: billingFname,
      lname: billingLname,
      address1: billingAddress1,
      zipCode: billingzipCode,
      city: billingcity,
      province: billingProvince,
      country: billingcountry,
      companyName: billingCompanyName,
    };

    const response = dispatch(
      handleCreatePaymentIntent({
        shippingAddress: showShippingAddressFields
          ? shippingAddress
          : billingAddress,
        billingAddress,
        phone,
        email,
        VAT,
        purchaseOrder,
        orderNotes,
        code: promoCode ? promoCode : "",
        token,
      })
    );
    if (response) {
      response.then((res: any) => {
        if (res?.payload?.status === "success") {
          setActiveComponent("success");
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveComponent("payment_method");
          setClientSecret(res?.payload?.clientSecret);
        }
      });
    }
  };

  function handleSetStatesForBillingField() {
    let findCountry: CountryType | undefined;
    if (selectedCountryForBilling === "") {
      findCountry = Country.getAllCountries().find(
        (c) => c.name === addresses?.billingAddress?.country
      );
      if (findCountry) {
        setSelectedCountryForBilling(findCountry?.name);
      }
      setStatesForBilling(State.getStatesOfCountry(findCountry?.isoCode));
    } else {
      findCountry = Country.getAllCountries().find(
        (c) => c.name === getValues("billingcountry")
      );
      if (findCountry) {
        setSelectedCountryForBilling(findCountry?.name);
      }
      const states = State.getStatesOfCountry(findCountry?.isoCode);
      if (states.length > 0) {
        setStatesForBilling(State.getStatesOfCountry(findCountry?.isoCode));
        !showBillingStateField && setShowBillingStateField(true);
        if (getValues().billingProvince === "") {
          setValue("billingProvince", states[0]?.name);
        }
        const findStateInStates = states.find((s) =>
          s.name.includes(getValues().billingProvince as string)
        );
        if (!findStateInStates) {
          setValue("billingProvince", states[0]?.name);
          handleChangeAddress(getValues());
        }
        handleChangeAddress(getValues());
      } else {
        setValue("billingProvince", "");
        setStatesForBilling([]);
        setShowBillingStateField(false);
      }
    }
  }

  function handleSetStatesForShippingField() {
    let findCountry: CountryType | undefined;
    if (selectedCountryForShipping === "") {
      findCountry = Country.getAllCountries().find(
        (c) => c.name === addresses?.shippingAddress?.country
      );
      if (findCountry) {
        setSelectedCountryForShipping(findCountry?.name);
      }
      setStatesForShipping(State.getStatesOfCountry(findCountry?.isoCode));
    } else {
      findCountry = Country.getAllCountries().find(
        (c) => c.name === getValues("shippingcountry")
      );
      if (findCountry) {
        setSelectedCountryForShipping(findCountry?.name);
      }
      const states = State.getStatesOfCountry(findCountry?.isoCode);
      if (states.length > 0) {
        setStatesForShipping(State.getStatesOfCountry(findCountry?.isoCode));
        !showShippingStateField && setShowShippingStateField(true);
        if (getValues().shippingProvince === "") {
          setValue("shippingProvince", states[0]?.name);
          handleChangeAddress(getValues());
        }

        const findStateInStates = states.find((s) =>
          s.name.includes(getValues().shippingProvince as string)
        );
        if (!findStateInStates) {
          setValue("shippingProvince", states[0]?.name);
        }
        handleChangeAddress(getValues());
      } else {
        setValue("shippingProvince", "");
        setStatesForShipping([]);
        setShowShippingStateField(false);
      }
    }
  }

  function handleChangeAddress(data: any) {
    if (!showShippingAddressFields || addressLoading) return;
    const response = dispatch(
      handleChangeUserAddress({
        addressType: "shipping",
        address1: addresses?.shippingAddress?.address1 as string,
        address2: addresses?.shippingAddress?.address2,
        address3: addresses?.shippingAddress?.address3,
        city: data?.shippingcity,
        province: data?.shippingProvince,
        country: data?.shippingcountry,
        zipCode: data?.shippingzipCode,
        token,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("address edited successfully."), { duration: 2000 });
        }
      });
    }
  }

  useEffect(() => {
    setCountries(Country.getAllCountries());
    return () => {
      abortApiCall();
    };
  }, []);

  // for billing
  useEffect(() => {
    handleSetStatesForBillingField();
  }, [watch("billingcountry"), watch("billingProvince")]);

  // for shipping
  useEffect(() => {
    handleSetStatesForShippingField();
  }, [watch("shippingcountry"), watch("shippingProvince")]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex lg:flex-row flex-col items-start gap-3"
    >
      <div className="md:space-y-5 space-y-3 lg:w-9/12 w-full">
        <p className="bg-darkBlue text-white text-left p-4 md:text-lg font-semibold">
          {t("Billing Information")}
        </p>
        {/* name */}
        <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
          <div className="md:w-1/2 w-full">
            <label htmlFor="first_name" className="Label">
              {t("First name")}
            </label>
            <input
              type="text"
              className="w-full input_field"
              {...register("billingFname")}
            />
            <span className="error">{errors?.billingFname?.message}</span>
          </div>
          <div className="md:w-1/2 w-full">
            <label htmlFor="last_name" className="Label">
              {t("Last name")}
            </label>
            <input
              type="text"
              className="w-full input_field"
              {...register("billingLname")}
            />
            <span className="error">{errors?.billingLname?.message}</span>
          </div>
        </div>
        {/* company name */}
        <div className="w-full">
          <label htmlFor="company_name" className="Label">
            {t("Company name")} (optional)
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("billingCompanyName")}
          />
          <span className="error">{errors?.billingCompanyName?.message}</span>
        </div>
        {/* country */}
        <div className="w-full">
          <label htmlFor="country" className="Label">
            {t("country")}
          </label>
          <select {...register("billingcountry")} className="input_field">
            {countries.length > 0 &&
              countries.map((country, i) => (
                <option
                  value={country?.name}
                  selected={
                    country.name.toLocaleLowerCase() ===
                    addresses?.billingAddress?.country.toLocaleLowerCase()
                  }
                  key={i}
                >
                  {country?.name}
                </option>
              ))}
          </select>
          <span className="error">{errors?.billingcountry?.message}</span>
        </div>
        {/* state */}
        {showBillingStateField && (
          <div className="w-full">
            <label htmlFor="province" className="Label">
              {t("state")}
            </label>

            <select {...register("billingProvince")} className="input_field">
              {statesForBilling.length > 0 &&
                statesForBilling.map((state, i) => (
                  <option
                    value={state?.name}
                    selected={getValues().billingProvince === state?.name}
                    key={i}
                  >
                    {state?.name}
                  </option>
                ))}
            </select>
            <span className="error">{errors?.billingProvince?.message}</span>
          </div>
        )}
        {/* street */}
        <div className="w-full">
          <label htmlFor="street_address" className="Label">
            {t("street address")}
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("billingAddress1")}
          />
          <span className="error">{errors?.billingAddress1?.message}</span>
        </div>
        {/* city */}
        <div className="w-full">
          <label htmlFor="city" className="Label">
            {t("city")}
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("billingcity")}
          />
          <span className="error">{errors?.billingcity?.message}</span>
        </div>
        {/* postal code */}
        <div className="w-full">
          <label htmlFor="postal_code" className="Label">
            {t("postal code")}
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("billingzipCode")}
          />
          <span className="error">{errors?.billingzipCode?.message}</span>
        </div>
        {/* phone + email */}
        <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
          <div className="md:w-1/2 w-full">
            <label htmlFor="phone" className="Label">
              {t("phone")}
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{
                validate: (value) => isValidPhoneNumber(value),
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  country={"fr"}
                  onChange={(value) => {
                    onChange(() => {
                      setValue("phone", "+".concat(value));
                    });
                  }}
                  value={value}
                  autocompleteSearch={true}
                  countryCodeEditable={false}
                  enableSearch={true}
                  inputStyle={{
                    width: "100%",
                    background: "#f9f9f9",
                    padding: "22px 0 22px 50px",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    // opacity:'0.7'
                  }}
                  dropdownStyle={{
                    background: "white",
                    color: "#13216e",
                    fontWeight: "600",
                    padding: "0px 0px 0px 10px",
                  }}
                />
              )}
            />
            <span className="error">{errors?.phone?.message}</span>
          </div>
          <div className="md:w-1/2 w-full">
            <label htmlFor="email" className="Label">
              {t("email")}
            </label>
            <input
              type="email"
              placeholder="adam@gmail.com"
              className="w-full input_field"
              {...register("email")}
            />
            <span className="error">{errors?.email?.message}</span>
          </div>
        </div>
        {/* vat number */}
        <div className="w-full">
          <label htmlFor="VAT" className="Label">
            {t("VAT number")} (optional)
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("VAT")}
          />
        </div>
        {/* puchrse order */}
        <div className="w-full">
          <label htmlFor="purchase_order" className="Label">
            {t("purchase order")} (optional)
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("purchaseOrder")}
          />
        </div>
        {/* check box for change shipping address */}
        <div className="flex items-center gap-3 w-full justify-start">
          <input
            type="checkbox"
            placeholder="Type here..."
            className="w-6 h-6"
            id="diff_shipping_address"
            checked={showShippingAddressFields}
            onClick={() =>
              setShowShippingAddressFields(!showShippingAddressFields)
            }
            disabled={checkoutLoading}
          />
          <label htmlFor="diff_shipping_address" className="Label select-none">
            {t("Ship to a different address?")}
          </label>
        </div>
        {/* shipping address */}
        {showShippingAddressFields && (
          <>
            {/* name */}
            <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
              <div className="md:w-1/2 w-full">
                <label htmlFor="first_name" className="Label">
                  {t("First name")}
                </label>
                <input
                  type="text"
                  className="w-full input_field"
                  {...register("shippingFname")}
                />
                <span className="error">{errors?.shippingFname?.message}</span>
              </div>
              <div className="md:w-1/2 w-full">
                <label htmlFor="last_name" className="Label">
                  {t("Last name")}
                </label>
                <input
                  type="text"
                  className="w-full input_field"
                  {...register("shippingLname")}
                />
                <span className="error">{errors?.shippingLname?.message}</span>
              </div>
            </div>
            {/* company name */}
            <div className="w-full">
              <label htmlFor="company_name" className="Label">
                {t("Company name")} (optional)
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input_field"
                {...register("shippingCompanyName")}
              />
              <span className="error">
                {errors?.shippingCompanyName?.message}
              </span>
            </div>
            {/* address 1*/}
            <div className="w-full">
              <label htmlFor="address_1" className="Label">
                {t("address")} 1
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input_field"
                {...register("shippingAddress1")}
              />
              <span className="error">{errors?.shippingAddress1?.message}</span>
            </div>
            {/* country */}
            <div className="w-full">
              <label htmlFor="country" className="Label">
                {t("country")}
              </label>
              <select {...register("shippingcountry")} className="input_field">
                {countries.length > 0 &&
                  countries.map((country, i) => (
                    <option
                      value={country?.name}
                      selected={getValues().shippingcountry === country?.name}
                      key={i}
                    >
                      {country?.name}
                    </option>
                  ))}
              </select>

              <span className="error">{errors?.shippingcountry?.message}</span>
            </div>
            {/* province */}
            {showShippingStateField && (
              <div className="w-full">
                <label htmlFor="province" className="Label">
                  {t("state")}
                </label>
                <select
                  {...register("shippingProvince")}
                  className="input_field"
                >
                  {statesForShipping.length > 0 &&
                    statesForShipping.map((state, i) => (
                      <option
                        value={state?.name}
                        selected={getValues().shippingProvince === state?.name}
                        key={i}
                      >
                        {state?.name}
                      </option>
                    ))}
                </select>

                <span className="error">
                  {errors?.shippingProvince?.message}
                </span>
              </div>
            )}
            {/* city */}
            <div className="w-full">
              <label htmlFor="city" className="Label">
                {t("city")}
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input_field"
                {...register("shippingcity")}
              />
              <span className="error">{errors?.shippingcity?.message}</span>
            </div>
            {/* postal code */}
            <div className="w-full">
              <label htmlFor="postal_code" className="Label">
                {t("postal code")}
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input_field"
                {...register("shippingzipCode")}
              />
              <span className="error">{errors?.shippingzipCode?.message}</span>
            </div>
          </>
        )}

        {/* order note */}
        <textarea
          //   name="order_note"
          className="input_field w-full min-h-[8rem] max-h-[8rem]"
          placeholder="Comment about your order, ex : delivery instrucrtions"
          {...register("orderNotes")}
        ></textarea>
      </div>

      <OrderSummary
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
        onSubmit={handleSubmit(onSubmit)}
        errors
      />
    </form>
  );
};

export default CheckoutForm;
