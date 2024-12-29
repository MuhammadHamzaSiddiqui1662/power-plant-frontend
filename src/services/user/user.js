import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "..";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getProfile: build.mutation({
      query(id) {
        return {
          url: `/users/profile?id=${id}`,
          method: "GET",
        };
      },
    }),
    addReview: build.mutation({
      query(body) {
        return {
          url: `/users/${body.userId}/${body.reviewType}/reviews`,
          method: "POST",
          body: body.data,
        };
      },
    }),
    getAllUsers: build.query({
      query: (filter = "") => `/users/${filter}`,
    }),
    getUser: build.query({
      query: (id) => `/users/${id}`,
    }),
    getBrokers: build.query({
      query: (filter = "") => `/users/brokers/${filter}`,
    }),
    getInvestors: build.query({
      query: (filter = "") => `/users/investors/${filter}`,
    }),
    updateUser: build.mutation({
      query(body) {
        return {
          url: `/users`,
          method: "PUT",
          body,
        };
      },
    }),
    addCertificate: build.mutation({
      query(body) {
        return {
          url: `/certificates`,
          method: "POST",
          body: body,
        };
      },
    }),
    deleteCertificate: build.mutation({
      query(id) {
        return {
          url: `/certificates/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  endpoints,
  useGetProfileMutation,
  useAddReviewMutation,
  useGetAllUsersQuery,
  useGetBrokersQuery,
  useGetInvestorsQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useAddCertificateMutation,
  useDeleteCertificateMutation,
} = userApi;
