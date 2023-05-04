import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import notifyReducer from '../reducers/notifyReducer';

export const store = configureStore({
  reducer: {
    notify: notifyReducer,
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
