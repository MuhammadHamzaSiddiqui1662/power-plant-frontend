import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../config/constants";

export const ipApi = createApi({
  reducerPath: "ipApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/ips`,
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
    getAll: build.query({
      query: (filter = "") => `/${filter}`,
    }),
    getIp: build.query({
      query: (id) => `/${id}`,
    }),
    getMyIps: build.query({
      query: () => `/my-ips`,
    }),
    createIp: build.mutation({
      query(body) {
        return {
          url: `/`,
          method: "POST",
          body,
        };
      },
    }),
    updateIp: build.mutation({
      query(body) {
        return {
          url: `/`,
          method: "PUT",
          body,
        };
      },
    }),
    publishIp: build.mutation({
      query(body) {
        return {
          url: `/${body.id}/publish`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useCreateIpMutation,
  useUpdateIpMutation,
  usePublishIpMutation,
  useGetAllQuery,
  useGetIpQuery,
  useGetMyIpsQuery,
} = ipApi;
