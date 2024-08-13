import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../config/constants";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/messages`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    messages: build.mutation({
      query(body) {
        return {
          url: `/`,
          method: "GET",
          body,
        };
      },
    }),
    message: build.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
    }),
    sendMessage: build.mutation({
      query(body) {
        return {
          url: `/`,
          method: "POST",
          body,
        };
      },
    }),
    updateMessage: build.mutation({
      query(body) {
        return {
          url: `/${body.id}`,
          method: "PUT",
          body:body.data,
        };
      },
    }),
    deleteMessage: build.mutation({
      query(Id) {
        return {
          url: `/${Id}`,
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
