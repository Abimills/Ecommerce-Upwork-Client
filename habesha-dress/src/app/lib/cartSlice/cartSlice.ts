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
  favorites: any[]; // TODO: define favorite item type
  showSignIn: boolean;
  showSearch: boolean;
  showSidebar: boolean;
}
// Define the initial state using that type
const initialState: CartState = {
  items: [
    // {
    //   title: "Product A",
    //   price: 10,
    //   quantity: 2,
    //   id: "1",
    //   inStock: true,
    //   chosen_colors: "red",
    //   chosen_sizes: "small",
    //   img: "http://res.cloudinary.com/dnokvmwmd/image/upload/v1707752115/uploads/tdq1efmykbvpd1vaospc.png",
    // },
    // {
    //   title: "Product B",
    //   price: 10,
    //   quantity: 2,
    //   id: "1",
    //   inStock: true,
    //   chosen_colors: "red",
    //   chosen_sizes: "small",
    //   img: "http://res.cloudinary.com/dnokvmwmd/image/upload/v1707752115/uploads/tdq1efmykbvpd1vaospc.png",
    // },
  ],
  favorites: ["65ca3c79755f8cbc3e0fb10a"],
  showSignIn: false,

  showSearch: false,
  showSidebar: false,
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<any>) => {
      const foundItem = state.favorites.find((item) => item === action.payload);
      if (!foundItem) {
        state.favorites.push(action.payload);
      }
      if (foundItem) {
        state.favorites = state.favorites.filter(
          (item: any) => item !== action.payload
        );
        console.log(state.favorites);
      }
    },

    toggleShowSignIn: (state) => {
      state.showSignIn = !state.showSignIn;
    },
    toggleShowSearch: (state) => {
      state.showSearch = !state.showSearch;
    },
    toggleShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addToCart: (state, action: PayloadAction<any>) => {
      const foundItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!foundItem) {
        state.items.push(action.payload);
        alert("added some new item to cart");
      }
      if (foundItem) {
        foundItem.quantity += 1;
        alert("added quantity to items ");
      }
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      const foundItem = state.items.find((item) => item.id === action.payload);
      if (foundItem) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        alert("removed one item");
      }
      if (!foundItem) {
        alert("No such product exists in the cart");
      }
    },
  },
});

export const {
  addToFavorites,
  toggleShowSearch,
  toggleShowSignIn,
  toggleShowSidebar,
  addToCart,

  removeFromCart,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
