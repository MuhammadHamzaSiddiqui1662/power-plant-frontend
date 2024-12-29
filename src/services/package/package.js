import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "..";

export const packageApi = createApi({
  reducerPath: "packageApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllPackages: build.query({
      query: () => `/packages`,
    }),
    getPackageByType: build.query({
      query: (type) => `/packages/type/${type}`,
    }),
  }),
});

export const { useGetAllPackagesQuery, useGetPackageByTypeQuery } = packageApi;
