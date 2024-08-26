import { createSlice } from "@reduxjs/toolkit";
import { notificationApi } from "../../services/notification/notification";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationApi.endpoints.getAllNotifications.matchFulfilled,
      (state, { payload }) => {
        state.notifications = payload;
      }
    );
  },
});

export const {} = notificationSlice.actions;

export default notificationSlice.reducer;
