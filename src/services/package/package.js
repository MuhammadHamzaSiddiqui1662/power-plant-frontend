import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../config/constants";

export const packageApi = createApi({
  reducerPath: "packageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/packages`,
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
    getAllPackages: build.query({
      query: () => `/`,
    }),
    getPackageByType: build.query({
      query: (type) => `/type/${type}`,
    }),
  }),
});

export const { useGetAllPackagesQuery, useGetPackageByTypeQuery } = packageApi;
