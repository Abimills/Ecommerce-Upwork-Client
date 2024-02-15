import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state

export interface CartItem {
  id: string;
  title: string;
  img: string;
  price: number;
  inStock: boolean;
  chosen_sizes: string;
  chosen_colors: string;

  quantity: number;
}
export interface CartState {
  items: CartItem[];
}
// Define the initial state using that type
const initialState: CartState = {
  items: [
    {
      title: "Product A",
      price: 10,
      quantity: 2,
      id: "1",
      inStock: true,
      chosen_colors: "red",
      chosen_sizes: "small",

      img: "http://res.cloudinary.com/dnokvmwmd/image/upload/v1707752115/uploads/tdq1efmykbvpd1vaospc.png",
    },
    {
      title: "Product B",
      price: 10,
      quantity: 2,
      id: "1",
      inStock: true,
      chosen_colors: "red",
      chosen_sizes: "small",

      img: "http://res.cloudinary.com/dnokvmwmd/image/upload/v1707752115/uploads/tdq1efmykbvpd1vaospc.png",
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {},
    decrement: (state) => {},
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
});

export const { increment, decrement, incrementByAmount } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
