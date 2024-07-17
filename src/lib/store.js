import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
