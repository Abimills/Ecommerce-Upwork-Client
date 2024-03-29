import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Define a type for the slice state
// const notify = () => toast("Wow so easy !");
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
  showFilter: boolean;
  showSidebar: boolean;
  showNewsletter: boolean;
  showNotification: boolean;
}
const loadUserFavoritesFromLocalStorage = (): any => {
  // try {
  const favJson: any = localStorage.getItem("favorites");
  if (favJson) {
    return JSON.parse(favJson);
  } else {
    return [];
  }
  const nullCheck = (val: any) => (val === "null" ? null : val);

  // } catch (error) {
  //   console.log(error);
  // }
};
const loadUserCartFromLocalStorage = () => {
  const cartJson: any = localStorage.getItem("cart");

  if (cartJson) {
    return JSON.parse(cartJson);
  } else {
    return [];
  }
};

// Define the initial state using that type
const initialState: CartState = {
  items: loadUserCartFromLocalStorage() || [],
  favorites: loadUserFavoritesFromLocalStorage() || [],
  showSignIn: false,
  showNewsletter: false,
  showSearch: false,
  showSidebar: false,
  showFilter: false,
  showNotification: false,
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
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
        // toast("Added to favorites", {
        //   position: "bottom-right",
        //   hideProgressBar: true,

        // });
      }
      if (foundItem) {
        state.favorites = state.favorites.filter(
          (item: any) => item !== action.payload
        );
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
        // toast("Removed from favorites", {
        //   hideProgressBar: true,
        //   position: "bottom-right",
        // });
      }
    },

    toggleShowSignIn: (state) => {
      state.showSignIn = !state.showSignIn;
    },
    toggleShowNotification: (state, action: PayloadAction<boolean>) => {
      if (action?.payload) {
        state.showNotification = action?.payload;
      } else {
        state.showNotification = !state.showNotification;
      }
    },
    toggleShowNewsletter: (state) => {
      state.showNewsletter = !state.showNewsletter;
    },
    toggleShowSearch: (state) => {
      state.showSearch = !state.showSearch;
    },
    toggleShowFilter: (state) => {
      state.showFilter = !state.showFilter;
    },
    toggleShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    setCartQuantity: (state, action: PayloadAction<any>) => {
      const itemExist = state.items.find(
        (item: any) => item.id === action.payload.id
      );
      if (itemExist) {
        itemExist.quantity = action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state.items));
      } else if (!itemExist) {
        toast.error("item does not exist, thus you can not add quantity");
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addToCart: (state, action: PayloadAction<any>) => {
      const foundItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!foundItem) {
        state.items.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
        toast.success("Added Item to cart!");
      }
      if (foundItem) {
        foundItem.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
        toast.success("Quantity added to Item!");
      }
    },
    emptyCart: (state) => {
      state.items = [];
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      const foundItem = state.items.find((item) => item.id === action.payload);
      if (foundItem) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
        toast("Removed from cart!");
      }
      if (!foundItem) {
        toast.error("No such product exists in the cart");
      }
    },
  },
});

export const {
  addToFavorites,
  toggleShowSearch,
  toggleShowSignIn,
  toggleShowSidebar,
  toggleShowFilter,
  setCartQuantity,
  addToCart,
  emptyCart,
  toggleShowNewsletter,
  toggleShowNotification,
  removeFromCart,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
