import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/authSlice.js";
import themeSlice from "@/store/themeSlice.js";
import languageSlice from "@/store/languageSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    language: languageSlice,
  },
});