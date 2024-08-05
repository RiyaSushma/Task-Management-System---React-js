const mongoose = require('mongoose');

const taskItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    count: {
        type: Number,
        required: true,
        default: 0,
    }
});

module.exports = mongoose.model('TaskItem', taskItemSchema);    