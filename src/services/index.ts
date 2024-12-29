import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../config/constants";
import { logout, setAuthCreds } from "../lib/features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL, // Your API base URL
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.accessToken; // Adjust based on your Redux slice
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Get the refresh token from the state
    const state: any = api.getState();
    const refreshToken = state.auth.refreshToken; // Ensure your auth slice stores refreshToken

    if (refreshToken) {
      // Send a request to refresh the token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken }, // Send refresh token in the body
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Store the new access token
        api.dispatch(setAuthCreds(refreshResult.data));

        // Retry the original request with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh fails, log out the user
        api.dispatch(logout());
      }
    } else {
      // If no refresh token is available, log out the user
      api.dispatch(logout());
    }
  }
  return result;
};

export default baseQueryWithReauth;
