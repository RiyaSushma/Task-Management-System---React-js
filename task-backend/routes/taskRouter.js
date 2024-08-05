const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateJwt = require('../middlewares/authMiddleware');

// Route to get all tasks
router.get('/api/tasks', authenticateJwt, taskController.getAllTasks);

// Route to get tasks for a specific user
router.get('/api/tasks/user/:userId', authenticateJwt, taskController.getTaskForUser);

// Route to get a specific task by ID
router.get('/api/tasks/:taskId', authenticateJwt, taskController.getTaskById);

// Route to create a new task
router.post('/api/tasks', authenticateJwt, taskController.createTask);

// Route to update a specific task
router.put('/api/tasks/:taskId', authenticateJwt, taskController.updateTask);

// Route to delete a specific task
router.delete('/api/tasks/:taskId', authenticateJwt, taskController.deleteTask);

module.exports = router;
