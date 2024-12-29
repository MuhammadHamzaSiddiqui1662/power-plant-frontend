import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "..";

export const hiringApi = createApi({
  reducerPath: "hiringApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getHiringDetails: build.query({
      query: (query) => `/chats/hiring-details${query}`,
    }),
    getMyBrokers: build.query({
      query: () => `/chats/brokers`,
    }),
    getMyInvestors: build.query({
      query: () => `/chats/investors`,
    }),
  }),
});

export const {
  useGetMyBrokersQuery,
  useGetMyInvestorsQuery,
  useGetHiringDetailsQuery,
} = hiringApi;
