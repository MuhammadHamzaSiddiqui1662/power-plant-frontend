import { createSlice } from "@reduxjs/toolkit";
import { ipApi } from "../../services/ip/ip";

const initialState = {
  ip: [],
};

const ipSlice = createSlice({
  name: "ip",
  initialState: initialState,
  reducers: {
    setIps: (state, action) => {
      state.ip = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ipApi.endpoints.getAll.matchFulfilled,
      (state, { payload }) => {
        state.ip = payload;
      }
    );
  },
});

export const { setIps } = ipSlice.actions;

export default ipSlice.reducer;
