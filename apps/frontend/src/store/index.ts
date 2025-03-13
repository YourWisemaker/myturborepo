import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here as needed
  },
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
