import { createSlice } from "@reduxjs/toolkit";
import { ipApi } from "../../services/ip/ip";

const initialState = {
  ip: [],
  currentIp: {},
};

const ipSlice = createSlice({
  name: "ip",
  initialState: initialState,
  reducers: {
    setIps: (state, action) => {
      state.ip = action.payload;
    },
    setCurrentIp: (state, { payload }) => {
      state.currentIp = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ipApi.endpoints.getAll.matchFulfilled,
      (state, { payload }) => {
        state.ip = payload;
      }
    );
    builder.addMatcher(
      ipApi.endpoints.getIp.matchFulfilled,
      (state, { payload }) => {
        state.currentIp = payload;
      }
    );
  },
});

export const { setIps, setCurrentIp } = ipSlice.actions;

export default ipSlice.reducer;
