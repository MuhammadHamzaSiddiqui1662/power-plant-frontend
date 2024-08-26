import { createSlice } from "@reduxjs/toolkit";
import { hiringApi } from "../../services/hiring/hiring";
import { logout } from "./authSlice";

const initialState = {
  myBrokers: [],
  myInvestors: [],
  hiringDetails: {},
  currentInvestor: {},
};

const hiringSlice = createSlice({
  name: "hiring",
  initialState: initialState,
  reducers: {
    setCurrentInvestor: (state, { payload }) => {
      state.currentInvestor = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.currentInvestor = {};
    });
    builder.addMatcher(
      hiringApi.endpoints.getHiringDetails.matchFulfilled,
      (state, { payload }) => {
        state.hiringDetails = payload;
      }
    );
    builder.addMatcher(
      hiringApi.endpoints.getMyBrokers.matchFulfilled,
      (state, { payload }) => {
        state.myBrokers = payload;
      }
    );
    builder.addMatcher(
      hiringApi.endpoints.getMyInvestors.matchFulfilled,
      (state, { payload }) => {
        state.myInvestors = payload;
      }
    );
  },
});

export const { setCurrentInvestor } = hiringSlice.actions;

export default hiringSlice.reducer;
