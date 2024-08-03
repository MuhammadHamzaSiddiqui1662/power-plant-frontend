import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth/auth";
import { ipApi } from "../services/ip/ip";
import { chatApi } from "../services/chat/chat";
import { messageApi } from "../services/message/message";
import authReducer from "./features/authSlice";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [ipApi.reducerPath]: ipApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(ipApi.middleware)
        .concat(chatApi.middleware)
        .concat(messageApi.middleware),
  });
};
