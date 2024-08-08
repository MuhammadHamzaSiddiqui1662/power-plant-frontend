import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../config/constants";

export const hiringApi = createApi({
  reducerPath: "hiringApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/hirings`,
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
    getAllHirings: build.query({
      query: () => `/`,
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
  useGetAllHiringsQuery,
  useGetMyBrokersQuery,
  useGetMyInvestorsQuery,
} = hiringApi;
