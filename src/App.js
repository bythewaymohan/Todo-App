//This is the main component of the application. It includes the TaskInput and TaskList components.

import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Container, Typography, Box } from '@mui/material';
import './App.css';

const App = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" marginTop={5}>
        <Typography variant="h3" gutterBottom>
          To-Do Application
        </Typography>
        <TaskInput /> {/* Component for adding new tasks */}
        <TaskList /> {/* Component for displaying the task list */}
      </Box>
    </Container>
  );
};

export default App;
