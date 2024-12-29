import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "..";

export const ipApi = createApi({
  reducerPath: "ipApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAll: build.query({
      query: (filter = "") => `/ips/${filter}`,
    }),
    getIp: build.query({
      query: (id) => `/ips/${id}`,
    }),
    getMyIps: build.query({
      query: () => `/ips/my-ips`,
    }),
    createIp: build.mutation({
      query(body) {
        return {
          url: `/ips`,
          method: "POST",
          body,
        };
      },
    }),
    updateIp: build.mutation({
      query(body) {
        return {
          url: `/ips`,
          method: "PUT",
          body,
        };
      },
    }),
    publishIp: build.mutation({
      query(body) {
        return {
          url: `/ips/${body.id}/publish`,
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
