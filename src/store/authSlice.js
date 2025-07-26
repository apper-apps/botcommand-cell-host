import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  guilds: [],
  selectedGuild: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.guilds = action.payload.guilds;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.guilds = [];
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.guilds = [];
      state.selectedGuild = null;
      state.error = null;
    },
    selectGuild: (state, action) => {
      state.selectedGuild = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  selectGuild,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;