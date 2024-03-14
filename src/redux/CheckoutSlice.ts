import {
  Address,
  BillingAddress,
  CreatePaymentIntentTypes,
  ShippingAddress,
  SubscriptionDetails,
  SubscriptionDetailsAPIresonse,
} from "./../types/index";
import { GetUrl, PostUrl } from "@/BaseUrl";
import { CheckoutInitialState } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const handleGetSubscriptionDetails = createAsyncThunk(
  "checkout/handleGetSubscriptionDetails",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl<SubscriptionDetailsAPIresonse>(
        "subscription-details"
      );
      return data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleApplyPromoCode = createAsyncThunk(
  "checkout/handleApplyPromoCode",
  async (
    { token, code }: { token: string | null; code: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await PostUrl("promo", {
        data: { code },
        headers: { Authorization: token },
      });
      return data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleCreatePaymentIntent = createAsyncThunk(
  "checkout/handleCreatePaymentIntent",
  async (
    {
      shippingAddress,
      billingAddress,
      phone,
      email,
      VAT,
      purchaseOrder,
      orderNotes,
      code,
      token,
    }: CreatePaymentIntentTypes,
    { rejectWithValue }
  ) => {
    try {
      const response = await PostUrl(`create-payment-intent`, {
        data: {
          shippingAddress,
          billingAddress,
          phone,
          email,
          VAT,
          purchaseOrder,
          orderNotes,
          code,
          support: "digital",
        },
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleCreateOrder = createAsyncThunk(
  "checkout/handleCreateOrder",
  async (
    {
      paymentIntentId,
      token,
    }: { paymentIntentId: string; token: string | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await PostUrl(`create-order`, {
        data: {
          paymentIntentId,
        },
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState: CheckoutInitialState = {
  checkoutLoading: false,
  isPromoCodeApplied: false,
  promoCode: null,
  promoCodeLoading: false,
  promoCodeDiscount: 0,
  eec_switzerland_overseas_territories: [
    "Germany",
    "Switzerland",
    "Austria",
    "Belgium",
    "Bulgaria",
    "Cyprus",
    "Croatia",
    "Denmark",
    "Spain",
    "Estonia",
    "Finland",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Czech Republic",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Sweden",
    "Guadeloupe",
    "Martinique",
    "French Guiana",
    "Reunion",
    "Mayotte",
    "Saint Pierre and Miquelon",
    "Saint Barthelemy",
    "Saint Martin",
    "Wallis and Futuna",
    "French Polynesia",
    "New Caledonia",
    "Clipperton Island",
  ],
  total: 0,
  tax: 0,
  subTotal: 0,
  error: null,
  getSubsciptionDetailsLoading: false,
  subscriptionDetails: null,
};

const CheckoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    handleCalculateTotal: (state) => {
      if (state.isPromoCodeApplied && state.promoCode !== "") {
        const total = state.subTotal - state.promoCodeDiscount;
        if (total <= 0) {
          state.total = state.total;
        } else {
          state.total = total;
        }
      }
    },
    handleChangePromoCode: (state, { payload }) => {
      state.promoCode = payload;
    },
    handleRemovePromoCode: (state) => {
      state.promoCode = "";
      state.isPromoCodeApplied = false;
      state.promoCodeDiscount = 0;
      state.total = state.subTotal;
    },
    handleChangeTotal: (state, { payload }) => {
      state.subTotal = payload?.subTotal;
      state.total = payload?.total;
    },
    handleChangePromoCodeDiscount: (state, { payload }) => {
      state.promoCodeDiscount = payload;
    },
  },
  extraReducers: (builder) => {
    // get subscription details
    builder
      .addCase(handleGetSubscriptionDetails.pending, (state, action) => {
        state.getSubsciptionDetailsLoading = true;
      })
      .addCase(
        handleGetSubscriptionDetails.fulfilled,
        (state, { payload }: PayloadAction<SubscriptionDetailsAPIresonse>) => {
          state.getSubsciptionDetailsLoading = false;
          state.subscriptionDetails = { ...payload.subscriptions[0] };
          state.subTotal = payload.subscriptions[0].priceDigital;
          state.total = payload.subscriptions[0].priceDigital;
          state.error = null;
        }
      )
      .addCase(
        handleGetSubscriptionDetails.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.getSubsciptionDetailsLoading = false;
          state.subscriptionDetails = null;
          state.error = payload ?? null;
        }
      );

    // apply promo code
    builder
      .addCase(handleApplyPromoCode.pending, (state, action) => {
        state.promoCodeLoading = true;
      })
      .addCase(handleApplyPromoCode.fulfilled, (state, { payload }) => {
        state.promoCodeLoading = false;
        state.promoCode = payload?.promoCode?.code;
        state.isPromoCodeApplied = true;
        state.error = null;
      })
      .addCase(
        handleApplyPromoCode.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.promoCodeLoading = false;
          state.isPromoCodeApplied = false;
          state.error = payload ?? null;
        }
      );

    // create paymnet intent
    builder.addCase(handleCreatePaymentIntent.pending, (state, {}) => {
      state.checkoutLoading = true;
      state.error = null;
    });
    builder.addCase(
      handleCreatePaymentIntent.fulfilled,
      (state, { payload }) => {
        state.checkoutLoading = false;
        state.error = null;
      }
    );
    builder.addCase(
      handleCreatePaymentIntent.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.checkoutLoading = false;
        state.error = payload ?? null;
      }
    );

    // create order
    builder.addCase(handleCreateOrder.pending, (state, {}) => {
      state.checkoutLoading = true;
      state.error = null;
    });
    builder.addCase(handleCreateOrder.fulfilled, (state, { payload }) => {
      state.checkoutLoading = false;
      state.error = null;
    });
    builder.addCase(
      handleCreateOrder.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.checkoutLoading = false;
        state.error = payload ?? null;
      }
    );
  },
});

export const {
  handleChangePromoCode,
  handleRemovePromoCode,
  handleChangeTotal,
  handleChangePromoCodeDiscount,
  handleCalculateTotal,
} = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
