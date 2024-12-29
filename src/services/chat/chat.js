import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "..";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getMyChats: build.query({
      query: (userType) => `/chats/?userType=${userType}`,
    }),
    getChatById: build.query({
      query: (id) => `/chats/${id}`,
    }),
    chats: build.mutation({
      query(userType) {
        return {
          url: `/chats/?userType=${userType}`,
          method: "GET",
        };
      },
    }),
    chat: build.mutation({
      query(id) {
        return {
          url: `/chats/${id}`,
          method: "GET",
        };
      },
    }),
    createChat: build.mutation({
      query(body) {
        return {
          url: `/chats/`,
          method: "POST",
          body,
        };
      },
    }),
    updateChat: build.mutation({
      query(chat) {
        return {
          url: `/chats/${chat._id}`,
          method: "PUT",
          body: chat,
        };
      },
    }),
    deleteChat: build.mutation({
      query(body) {
        return {
          url: `/chats/${id}`,
          method: "DELETE",
          body,
        };
      },
    }),
  }),
});

export const {
  endpoints,
  useGetMyChatsQuery,
  useGetChatByIdQuery,
  useChatsMutation,
  useChatMutation,
  useCreateChatMutation,
  useUpdateChatMutation,
  useDeleteChatMutation,
} = chatApi;
