//This file contains the Redux slice for managing tasks. 
//It includes actions and reducers for adding, deleting, editing, toggling, and filtering tasks. 
//It also includes middleware for persisting tasks to local storage.

import { createSlice } from '@reduxjs/toolkit';

// Load tasks from local storage
const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: loadTasks(),
        filter: 'all', // 'all', 'completed', 'uncompleted'
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({ ...action.payload, completed: false });
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((_, index) => index !== action.payload);
        },
        editTask: (state, action) => {
            const { index, newText } = action.payload;
            state.tasks[index].text = newText;
        },
        toggleTask: (state, action) => {
            const task = state.tasks[action.payload];
            task.completed = !task.completed;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

// Save tasks to local storage whenever they change
export const persistTasksMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (['tasks/addTask', 'tasks/deleteTask', 'tasks/editTask', 'tasks/toggleTask'].includes(action.type)) {
        const tasks = store.getState().tasks.tasks;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    return result;
};

export const { addTask, deleteTask, editTask, toggleTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
