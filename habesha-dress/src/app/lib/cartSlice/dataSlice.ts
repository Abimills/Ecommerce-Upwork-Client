import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch("http://localhost:3000/api/product"); // Replace with your actual API endpoint
  const data = response.json();
  

  return data;
});
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

export const dataSlice = createSlice({
  name: "data",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: { status: "idle", data: null, error: {} },

  reducers: {
    //     setInitialData: (state, action: PayloadAction<any[]>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = { error: "error while trying to fetch" };
      });
  },
});

// export const { setInitialData } = dataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
