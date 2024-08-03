import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../config/constants";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/users`,
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
    getAllUsers: build.query({
      query: (filter = "") => `/${filter}`,
    }),
    getUser: build.query({
      query: (id) => `/${id}`,
    }),
    getBrokers: build.query({
      query: (filter = "") => `/brokers/${filter}`,
    }),
    getInvestors: build.query({
      query: (filter = "") => `/investors/${filter}`,
    }),
    updateUser: build.mutation({
      query(body) {
        return {
          url: `/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetBrokersQuery,
  useGetInvestorsQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;
