
//This component displays the list of tasks. Each task can be edited, deleted, or marked as completed. 
//It also includes filter buttons to show all, completed, or uncompleted tasks.

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, IconButton, Checkbox, TextField, Box, Button } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { deleteTask, toggleTask, editTask, setFilter } from '../tasksSlice';

const TaskList = () => {
    const { tasks, filter } = useSelector((state) => state.tasks); // Get tasks and filter from Redux state
    const dispatch = useDispatch();
    const [editingIndex, setEditingIndex] = useState(null); // Local state for editing task index
    const [editingText, setEditingText] = useState(''); // Local state for editing task text

    const handleEditClick = (index, text) => {
        setEditingIndex(index); // Set the index of the task being edited
        setEditingText(text); // Set the text of the task being edited
    };

    const handleSaveClick = (index) => {
        dispatch(editTask({ index, newText: editingText })); // Dispatch editTask action with new text
        setEditingIndex(null); // Clear editing index
        setEditingText(''); // Clear editing text
    };

    const handleCancelClick = () => {
        setEditingIndex(null); // Clear editing index
        setEditingText(''); // Clear editing text
    };

    // Filter tasks based on the current filter state
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'uncompleted') return !task.completed;
        return true;
    });

    return (
        <Box>
            {/* Filter buttons */}
            <Box display="flex" justifyContent="center" marginBottom={2}>
                <Button onClick={() => dispatch(setFilter('all'))}>All</Button>
                <Button onClick={() => dispatch(setFilter('completed'))}>Completed</Button>
                <Button onClick={() => dispatch(setFilter('uncompleted'))}>Uncompleted</Button>
            </Box>
            {/* Task list */}
            <List>
                {filteredTasks.map((task, index) => (
                    <ListItem key={index}>
                        <Checkbox
                            checked={task.completed}
                            onChange={() => dispatch(toggleTask(index))} // Toggle task completion status
                        />
                        {editingIndex === index ? (
                            <>
                                <TextField
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                />
                                <IconButton onClick={() => handleSaveClick(index)}>
                                    <SaveIcon />
                                </IconButton>
                                <IconButton onClick={handleCancelClick}>
                                    <CancelIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <ListItemText
                                    primary={task.text}
                                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }} // Strikethrough completed tasks
                                />
                                <IconButton onClick={() => handleEditClick(index, task.text)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => dispatch(deleteTask(index))}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TaskList;
