import { createSlice } from '@reduxjs/toolkit';

const getInitialLanguage = () => {
  try {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  } catch (error) {
    return 'en';
  }
};

const initialState = {
  currentLanguage: getInitialLanguage(),
  availableLanguages: ['en', 'es', 'fr', 'de', 'ja', 'ko']
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      try {
        localStorage.setItem('language', action.payload);
      } catch (error) {
        console.warn('Failed to save language preference to localStorage:', error);
      }
    }
  }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;