import type { AuthState } from "@/types/type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  first_name: "",
  last_name: "",
  message: "",
  phone_no: "",
  role: "",
  token: "",
  status: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Userlogin: (state, action: PayloadAction<AuthState>) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.message = action.payload.message;
      state.phone_no = action.payload.phone_no;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.status = action.payload.status;
    },
    logout: () => initialState,
  },
});

export const { Userlogin, logout } = authSlice.actions;
export default authSlice.reducer;
