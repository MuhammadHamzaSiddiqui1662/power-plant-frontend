import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../config/constants";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/auth`,
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
    login: build.mutation({
      query(body) {
        return {
          url: `login`,
          method: "POST",
          body,
        };
      },
    }),
    register: build.mutation({
      query(body) {
        return {
          url: `register`,
          method: "POST",
          body,
        };
      },
    }),
    verifyOtp: build.mutation({
      query(body) {
        return {
          url: `verify-otp`,
          method: "POST",
          body,
        };
      },
    }),
    resendOtp: build.mutation({
      query(body) {
        return {
          url: `resend-otp`,
          method: "POST",
          body,
        };
      },
    }),
    refreshToken: build.mutation({
      query(body) {
        return {
          url: `refresh-token`,
          method: "POST",
          body,
        };
      },
    }),
    forgotPassword: build.mutation({
      query(body) {
        return {
          url: `forgot-password`,
          method: "POST",
          body,
        };
      },
    }),
    resetPassword: build.mutation({
      query(body) {
        return {
          url: `reset-password`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  endpoints,
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
