import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "..";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    stripePaymentIntent: build.mutation({
      query(body) {
        return {
          url: `/payment/stripe`,
          method: "POST",
          body,
        };
      },
    }),
    getStripePaymentIntent: build.query({
      query: (packageType) => `/payment/stripe/${packageType}/usd`,
    }),
  }),
});

export const {
  endpoints,
  useStripePaymentIntentMutation,
  useGetStripePaymentIntentQuery,
} = paymentApi;
