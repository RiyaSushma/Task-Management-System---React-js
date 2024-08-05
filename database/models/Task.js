const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'urgent'],
        default: 'medium',
        required: true,
    },
    status: {
        type: String,
        enum: ['todo', 'in progress', 'completed'],
        default: 'todo',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Task = mongoose.model('Tasks', TaskSchema);

module.exports = Task;