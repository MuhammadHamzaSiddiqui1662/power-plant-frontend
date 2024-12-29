import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "..";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllNotifications: build.query({
      query: () => `/notifications`,
    }),
    fireServerNotification: build.mutation({
      query(body) {
        return {
          url: `/notifications`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useFireServerNotificationMutation,
} = notificationApi;
