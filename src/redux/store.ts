import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import tasksReducer from '../redux/slices/tasksSlice';
import themeReducer from '../redux/slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    theme: themeReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
