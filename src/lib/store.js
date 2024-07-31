import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth/auth";
import { ipApi } from "../services/ip/ip";
import { chatApi } from "../services/chat/chat";
import authReducer from "./features/authSlice";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [ipApi.reducerPath]: ipApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
};
