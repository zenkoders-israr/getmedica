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
    
    handleLogout(state) {
      state.user = null
      state.isAuthenticated = false
    }
  },
});

export const { setUserAuth, setUser, handleLogout } = authSlice.actions;

export default authSlice.reducer;
