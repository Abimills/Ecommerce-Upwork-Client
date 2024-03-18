import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface User {
  id: string;
  email: string;
  // Add other user properties
}
interface AuthState {
  user: User | null;
  // Add other relevant state properties
}
const initialState: any = {
  user: null,
};

const loadUserFromLocalStorage = (): AuthState => {
  const userJson: any = localStorage.getItem("user");
  if (userJson) {
    return { user: JSON.parse(userJson) };
  }
  return initialState;
};
const authSlice = createSlice({
  name: "auth",
  initialState: loadUserFromLocalStorage(),
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
