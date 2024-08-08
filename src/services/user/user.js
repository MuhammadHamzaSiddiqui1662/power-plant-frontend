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
    getProfile: build.mutation({
      query() {
        return {
          url: `/profile`,
          method: "GET",
        };
      },
    }),
    addReview: build.mutation({
      query(id, reviewType, body) {
        return {
          url: `/${id}/${reviewType}/reviews`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  endpoints,
  useGetProfileMutation,
  useAddReviewMutation,
} = userApi;
