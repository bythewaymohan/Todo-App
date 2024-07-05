//This file configures the Redux store with the tasks reducer and the persistence middleware.

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { persistTasksMiddleware } from './tasksSlice';

// Configure the Redux store with the tasks reducer and persistence middleware
export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistTasksMiddleware),
});
