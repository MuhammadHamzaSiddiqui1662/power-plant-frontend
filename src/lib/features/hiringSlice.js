import { createSlice } from "@reduxjs/toolkit";
import { hiringApi } from "../../services/hiring/hiring";

const initialState = {
  hirings: [],
  myBrokers: [],
  myInvestors: [],
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
    builder.addMatcher(
      hiringApi.endpoints.getAllHirings.matchFulfilled,
      (state, { payload }) => {
        state.hirings = payload;
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
