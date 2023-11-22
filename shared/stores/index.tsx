import appSlice from './appSlice';
import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();
export const store = configureStore({
  reducer: {
    appSlice: appSlice,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
