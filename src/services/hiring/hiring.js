import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../config/constants";

export const hiringApi = createApi({
  reducerPath: "hiringApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/chats`,
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
    getHiringDetails: build.query({
      query: (query) => `/hiring-details${query}`,
    }),
    getMyBrokers: build.query({
      query: () => `/brokers`,
    }),
    getMyInvestors: build.query({
      query: () => `/investors`,
    }),
  }),
});

export const {
  useGetMyBrokersQuery,
  useGetMyInvestorsQuery,
  useGetHiringDetailsQuery,
} = hiringApi;
