import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    phone: "",
  },
  userType: "",
  accessToken: "",
  refreshToken: "",
  accessTokenExpiry: 0,
  refreshTokenExpiry: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: { ...initialState },
  reducers: {
    logout: (state) => {
      state.user = initialState.user;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.accessTokenExpiry = initialState.accessTokenExpiry;
      state.refreshTokenExpiry = initialState.refreshTokenExpiry;
    },
    setAuthCreds: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.accessTokenExpiry = action.payload.accessTokenExpiry;
      state.refreshTokenExpiry = action.payload.refreshTokenExpiry;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { logout, setUser, setUserType, setAuthCreds } = authSlice.actions;

export default authSlice.reducer;
