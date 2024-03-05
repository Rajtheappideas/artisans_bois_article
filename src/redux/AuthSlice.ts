import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  user: null | object;
  error: null | object;
  token: null | string;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer;
