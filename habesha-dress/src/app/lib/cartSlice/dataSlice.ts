import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
// export const fetchData = createAsyncThunk("data/fetchData", async () => {
//   const response = await fetch("http://localhost:3000/api/product"); // Replace with your actual API endpoint
//   const data = response.json();

//   return data;
// });
// export interface CartItem {
//   id: string;
//   title: string;
//   description: string;
//   img: string;
//   price: number;
//   rating: number;
//   available_sizes: string[];
//   available_colors: string[];
//   purchasedNo: number;
//   type: string;
//   typeOfClothes: string;
// }
// export interface CartState {
//   products: CartItem[];
// }
// Define the initial state using that type
// const initialState: any = {

// };

export interface DataType {
  data: any[];
  sortedData: any[];
}
const initialState: DataType = {
  data: [],
  sortedData: [],
};
export const dataSlice = createSlice({
  name: "data",
  // `createSlice` will infer the state type from the `initialState` argument
  // initialState: { status: "idle", data: null, error: {} },
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    sortDataReducer: (state, action: PayloadAction<any>) => {
      state.sortedData = action.payload;
    },
  },
});

export const { sortDataReducer, setAllProducts } = dataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
