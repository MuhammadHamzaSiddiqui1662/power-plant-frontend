import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth/auth";
import { ipApi } from "../services/ip/ip";
import { userApi } from "../services/user/user";
import { hiringApi } from "../services/hiring/hiring";
import { chatApi } from "../services/chat/chat";
import { messageApi } from "../services/message/message";
import { packageApi } from "../services/package/package";
import authReducer from "./features/authSlice";
import ipReducer from "./features/ipSlice";
import hiringReducer from "./features/hiringSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Persist configuration for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
};

// Persist configuration for auth slice
const ipPersistConfig = {
  key: "ip",
  storage,
  whitelist: ["currentIp"],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  [ipApi.reducerPath]: ipApi.reducer,
  ip: persistReducer(ipPersistConfig, ipReducer),
  [hiringApi.reducerPath]: hiringApi.reducer,
  hiring: hiringReducer,
  [userApi.reducerPath]: userApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
  [packageApi.reducerPath]: packageApi.reducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      })
        .concat(authApi.middleware)
        .concat(ipApi.middleware)
        .concat(userApi.middleware)
        .concat(hiringApi.middleware)
        .concat(chatApi.middleware)
        .concat(messageApi.middleware)
        .concat(packageApi.middleware),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};
