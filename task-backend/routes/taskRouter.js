const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Route to get all tasks
router.get('/api/tasks', taskController.getAllTasks);

// Route to get tasks for a specific user
router.get('/api/tasks/user/:userId', taskController.getTaskForUser);

// Route to get a specific task by ID
router.get('/api/tasks/:taskId', taskController.getTaskById);

// Route to create a new task
router.post('/api/tasks', taskController.createTask);

// Route to update a specific task
router.put('/api/tasks/:taskId', taskController.updateTask);

// Route to delete a specific task
router.delete('/api/tasks/:taskId', taskController.deleteTask);

module.exports = router;
