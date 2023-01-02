import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/taskslist/taskSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
