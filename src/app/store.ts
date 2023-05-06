import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import notifyReducer from '../reducers/notifyReducer';
import languageReducer from '../reducers/languageReducer';

export const store = configureStore({
  reducer: {
    notify: notifyReducer,
    languageOptions: languageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
