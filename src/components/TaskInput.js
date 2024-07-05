import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { addTask } from '../tasksSlice';

const TaskInput = () => {
    const [task, setTask] = useState(''); // Local state for task input
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (task.trim()) {
            dispatch(addTask({ text: task })); // Dispatch addTask action with the task text
            setTask(''); // Clear input field
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTask(); // Add task on Enter key press
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
            <TextField
                label="Enter a new task"
                variant="outlined"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddTask}>
                Add Task
            </Button>
        </Box>
    );
};

export default TaskInput;
