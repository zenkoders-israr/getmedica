import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAuth(state, action) {
      state.isAuthenticated = action.payload;
    },

    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUserAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
