import { PostUrl } from "@/BaseUrl";
import {
  Address,
  AuthState,
  ChangePassword,
  LoginType,
  SignupPayload,
  UserType,
} from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const handleRegisterUser = createAsyncThunk(
  "auth/handleRegisterUser",
  async (
    {
      fname,
      lname,
      email,
      phone,
      civility,
      password,
      mobile,
      company,
      shippingAddress,
    }: UserType,
    { rejectWithValue }
  ) => {
    try {
      const response = await PostUrl(
        "https://boisnewsmedia.onrender.com/api/user/signup",
        {
          data: {
            fname,
            lname,
            email,
            phone,
            password,
            civility,
            mobile,
            company,
            shippingAddress,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleLoginUser = createAsyncThunk(
  "auth/handleLoginUser",
  async ({ email, password }: LoginType, { rejectWithValue }) => {
    try {
      const { data } = await PostUrl("login", {
        data: { email, password },
      });
      return data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }

      return rejectWithValue(error?.response);
    }
  }
);

export const handleVerifyOtp = createAsyncThunk(
  "auth/handleVerifyOtp",
  async ({ email, otp }: { email: any; otp: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios(
        "https://boisnewsmedia.onrender.com/api/user/verify-otp",
        {
          data: { email, otp },
          method: "POST",
        }
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

export const handleForgotPassword = createAsyncThunk(
  "auth/handleForgotPassword",
  async ({ email }: { email: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios(
        "https://boisnewsmedia.onrender.com/api/user/forgot-password",
        {
          data: { email },
          method: "POST",
        }
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

export const handleResetPassword = createAsyncThunk(
  "auth/handleResetPassword",
  async (
    {
      email,
      password,
      verifyToken,
    }: { email: string | null; password: string; verifyToken: string | null },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios(
        "https://boisnewsmedia.onrender.com/api/user/reset-password",
        {
          data: { email, password, verifyToken },
          method: "POST",
        }
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

export const handleEditProfile = createAsyncThunk(
  "auth/handleEditProfile",
  async (
    {
      fname,
      lname,
      email,
      phone,
      civility,
      password,
      mobile,
      company,
      shippingAddress,
      token,
    }: UserType,
    { rejectWithValue }
  ) => {
    try {
      const response = await PostUrl("profile", {
        data: {
          fname,
          lname,
          email,
          phone,
          password,
          civility,
          mobile,
          company,
          shippingAddress,
        },
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response);
    }
  }
);

export const handleChangePassword = createAsyncThunk(
  "auth/handleChangePassword",
  async (
    { oldPassword, newPassword, token }: ChangePassword,
    { rejectWithValue }
  ) => {
    try {
      const response = await PostUrl(
        "https://boisnewsmedia.onrender.com/api/user/change-password",
        {
          data: { oldPassword, newPassword },
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleChangeUserAddress = createAsyncThunk(
  "auth/handleChangeUserAddress",
  async (
    {
      addressType,
      address1,
      address2,
      address3,
      city,
      province,
      country,
      zipCode,
      token,
    }: Address,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios(
        "https://boisnewsmedia.onrender.com/api/user/address",
        {
          data: {
            addressType,
            address1,
            address2,
            address3,
            zipCode,
            city,
            country,
            province,
          },
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error: any) {
      if (error?.response?.message?.data) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// initital state
const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  token: null,
  verifyToken: null,
  email: null,
  addresses: { billingAddress: null, shippingAddress: null },
  addressLoading: false,
  editProfileLoading: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleChangeLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    handleChangeLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    handleStoreUserEmail: (state, { payload }) => {
      state.email = payload;
    },
    handleChangeAddress: (state, { payload }) => {
      state.addresses = payload;
    },
  },
  extraReducers: (builder) => {
    // handle register user
    builder
      .addCase(handleRegisterUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(
        handleRegisterUser.fulfilled,
        (
          state,
          { payload: { subscriber, token } }: PayloadAction<SignupPayload>
        ) => {
          state.loading = false;
          state.user = subscriber;
          state.error = null;
          state.token = token;
          state.verifyToken = null;
          state.email = null;
        }
      )
      .addCase(handleRegisterUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload ?? null;
        state.token = null;
        state.verifyToken = null;
        state.email = null;
      });

    // login user
    builder.addCase(handleLoginUser.pending, (state, {}) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      handleLoginUser.fulfilled,
      (state, { payload }: PayloadAction<SignupPayload>) => {
        state.loading = false;
        state.user = payload?.subscriber ?? null;
        state.error = null;
        state.token = payload?.token ?? null;
        state.verifyToken = null;
        state.email = null;
      }
    );
    builder.addCase(handleLoginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
      state.verifyToken = null;
      state.email = null;
    });

    // edit profile
    builder.addCase(handleEditProfile.pending, (state, {}) => {
      state.editProfileLoading = true;
      state.error = null;
    });
    builder.addCase(
      handleEditProfile.fulfilled,
      (state, { payload }: PayloadAction<SignupPayload>) => {
        state.editProfileLoading = false;
        state.user = payload?.subscriber ?? null;
        state.error = null;
      }
    );
    builder.addCase(handleEditProfile.rejected, (state, { payload }) => {
      state.editProfileLoading = false;
      state.user = state.user;
      state.error = payload ?? null;
    });

    // change password
    builder.addCase(handleChangePassword.pending, (state, {}) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      handleChangePassword.fulfilled,
      (state, { payload }: PayloadAction<ChangePassword>) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      }
    );
    builder.addCase(handleChangePassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = state.user;
      state.error = payload ?? null;
    });

    // forgot password
    builder.addCase(handleForgotPassword.pending, (state, {}) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleForgotPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      state.token = null;
    });
    builder.addCase(handleForgotPassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
    });
    // verfiy otp
    builder.addCase(handleVerifyOtp.pending, (state, {}) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleVerifyOtp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.token = null;
      state.verifyToken = payload?.verifyToken;
    });
    builder.addCase(handleVerifyOtp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload ?? null;
    });
    // reset password
    builder.addCase(handleResetPassword.pending, (state, {}) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleResetPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      state.token = null;
      state.email = null;
      state.verifyToken = null;
    });
    builder.addCase(handleResetPassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
    });

    // change address
    builder.addCase(handleChangeUserAddress.pending, (state, {}) => {
      state.addressLoading = true;
      state.error = null;
    });
    builder.addCase(handleChangeUserAddress.fulfilled, (state, { payload }) => {
      state.addressLoading = false;

      if (state.addresses) {
        state.addresses.billingAddress =
          payload?.billingAddress ?? state.addresses.billingAddress;
        state.addresses.shippingAddress =
          payload?.shippingAddress ?? state.addresses.shippingAddress;
      }

      state.error = null;
    });
    builder.addCase(handleChangeUserAddress.rejected, (state, { payload }) => {
      state.addressLoading = false;
      state.error = payload ?? null;
    });
  },
});

export const {
  handleChangeLoading,
  handleChangeLogout,
  handleStoreUserEmail,
  handleChangeAddress,
} = AuthSlice.actions;

export default AuthSlice.reducer;
