import { createSlice } from '@reduxjs/toolkit';
import { LangState } from '../app/types';

const initialState: LangState = { currentLang: 'en', visibilityLangBox: false };

const languageSlice = createSlice({
  name: 'languagesOptions',
  initialState,
  reducers: {
    setLanguage(state, action) {
      if (action.payload) {
        return { currentLang: action.payload, visibilityLangBox: false };
      }
      return { ...state, currentLang: 'en', visibilityLangBox: false };
    },
    setVisibilityLangBox(state, action) {
      if (action.payload) {
        return { ...state, visibilityLangBox: action.payload };
      }
      return { ...state, visibilityLangBox: false };
    },
  },
});

export const { setLanguage, setVisibilityLangBox } = languageSlice.actions;
export default languageSlice.reducer;
