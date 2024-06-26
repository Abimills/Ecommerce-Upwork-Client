import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice/cartSlice";
import dataSlice from "./cartSlice/dataSlice";
import authSlice from "./authSlice/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice,
      data: dataSlice,
      auth: authSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
