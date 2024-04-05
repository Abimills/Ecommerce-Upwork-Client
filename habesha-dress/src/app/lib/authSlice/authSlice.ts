import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface User {
  id: string;
  email: string;
  // Add other user properties
}
// const loadUser = (): any => {
//   const userJson: any = localStorage.getItem("user");
//   if (userJson) {
//     return JSON.parse(userJson);
//   } else {
//     return {};
//   }
// };
interface AuthState {
  user: User | null;
  // Add other relevant state properties
}
const initialState: any = {
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast("Your are Signed Out!");
    },
    // registerSuccess: (state, action: PayloadAction<User>) => {
    //   state.user = action.payload;
    // },
  },
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
