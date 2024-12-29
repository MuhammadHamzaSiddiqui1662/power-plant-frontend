import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "..";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    messages: build.mutation({
      query(body) {
        return {
          url: `/messages`,
          method: "GET",
          body,
        };
      },
    }),
    message: build.mutation({
      query(id) {
        return {
          url: `/messages/${id}`,
          method: "GET",
        };
      },
    }),
    sendMessage: build.mutation({
      query(body) {
        return {
          url: `/messages`,
          method: "POST",
          body,
        };
      },
    }),
    updateMessage: build.mutation({
      query(body) {
        return {
          url: `/messages/${body.id}`,
          method: "PUT",
          body: body.data,
        };
      },
    }),
    deleteMessage: build.mutation({
      query(Id) {
        return {
          url: `/messages/${Id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  endpoints,
  useMessagesMutation,
  useMessageMutation,
  useSendMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
