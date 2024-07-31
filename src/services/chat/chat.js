import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../config/constants";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/chats`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.accessToken;
      console.log("token---->"+token)
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    chats: build.mutation({
      query(body) {
        return {
          url: `/`,
          method: "GET",
          body,
        };
      },
    }),
    chat: build.mutation({
      query(body) {
        return {
          url: `/${id}`,
          method: "GET",
          body,
        };
      },
    }),
    createChat: build.mutation({
      query(body) {
        return {
          url: `/`,
          method: "POST",
          body,
        };
      },
    }),
    updateChat: build.mutation({
      query(body) {
        return {
          url: `/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteChat: build.mutation({
      query(body) {
        return {
          url: `/${id}`,
          method: "DELETE",
          body,
        };
      },
    }),
  }),
});

export const {
  endpoints,
  useChatMutation,
  useChatsMutation,
  useCreateChatMutation,
  useUpdateChatMutation,
  useDeleteChatMutation,
} = chatApi;
