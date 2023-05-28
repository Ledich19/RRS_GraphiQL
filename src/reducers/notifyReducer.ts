import { createSlice } from '@reduxjs/toolkit';
import { NotifyType } from '../app/types';

const initialState: NotifyType = { type: '', text: '' };

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setNotify(state, action) {
      if (action.payload) {
        return action.payload;
      }
      return { ...state, type: null, text: null };
    },
  },
});

export const { setNotify } = notifySlice.actions;
export default notifySlice.reducer;
