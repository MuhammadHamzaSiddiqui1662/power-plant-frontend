import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth/auth";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    phone: "",
  },
  accessToken: "",
  refreshToken: "",
  accessTokenExpiry: 0,
  refreshTokenExpiry: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.accessTokenExpiry = payload.accessTokenExpiry;
        state.refreshTokenExpiry = payload.refreshTokenExpiry;
      }
    );
    builder.addMatcher(
      authApi.endpoints.verifyOtp.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.accessTokenExpiry = payload.accessTokenExpiry;
        state.refreshTokenExpiry = payload.refreshTokenExpiry;
      }
    );
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.accessTokenExpiry = payload.accessTokenExpiry;
        state.refreshTokenExpiry = payload.refreshTokenExpiry;
      }
    );
  },
});

export default authSlice.reducer;
