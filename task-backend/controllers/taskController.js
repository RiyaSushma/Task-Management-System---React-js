const User = require('../../database/models/User');
const TaskList = require('../../database/models/TaskList');
const Task = require('../../database/models/Task');
const {Types: {ObjectId}} = require('mongoose');

// get all tasks
exports.getAllTasks = async(req, res) => {
    try {
        const tasks = await Task.find();
        res.json({ success: true, tasks });
    } catch(err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// get tasks for a specific error
exports.getTaskForUser = async(req, res) => {
    try {
        const userId = req.params.userId;
        const userObjectId = new ObjectId(userId);
        console.log(userObjectId);
        const taskItem = await TaskList.findOne({ user: userObjectId });
        console.log(taskItem);
        if(!taskItem) {
            return res.status(404).json({ success: false, message: 'No tasks found for this user' });
        }
        res.json({ success: true, tasks: taskItem.tasks });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// get a specific task by id
exports.getTaskById = async(req, res) => {
    try {
        const taskId = req.params.taskId;
        console.log(taskId);
        const taskObjectId = new ObjectId(taskId);
        const task = await Task.findById(taskObjectId);
        if(!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.json({ success: true, task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// create new task
exports.createTask = async(req, res) => {
    try {
        const { title, description, priority, status, userId } = req.body;
        const newTask = new Task({ title, description, priority, status, user: userId });
        await newTask.save();

        await TaskList.findOneAndUpdate(
            { user: userId },
            { $push: { tasks: newTask._id, $inc: { count: 1 } } },
            { new: true, upsert: true }
        );

        res.status(201).json({ success: true, task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// update a specific task
exports.updateTask = async(req, res) => {
    try {
        const taskId = req.params.taskId;
        const updates = req.body;
        const taskObjectId = new ObjectId(taskId);
        console.log(taskObjectId, req.body);
        const updateTask = await Task.findByIdAndUpdate(taskObjectId, updates, { new: true });
        if(!updateTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.json({ success: true, task: updateTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// Delete a specific task
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const taskObjectId = new ObjectId(taskId);
        const deletedTask = await Task.findByIdAndDelete(taskObjectId);
        if (!deletedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // Remove the task from the user's task list
        await TaskList.findOneAndUpdate(
            { user: deletedTask.user },
            { $pull: { tasks: taskId }, $inc: { count: -1 } },
            { new: true }
        );

        res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};