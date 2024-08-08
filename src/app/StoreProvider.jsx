"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "../lib/store";

export default function StoreProvider({ children }) {
  const storeRef = useRef();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    const { store, persistor } = makeStore();
    storeRef.current = { store, persistor };
  }

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate loading={null} persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
