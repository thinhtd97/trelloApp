const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objectId = Schema.Types.ObjectId;

const taskSchema = new Schema({
    title: {
        type: String,
    },
    due_time: {
        type: Date,
    },
    taskId: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "Uncompleted"
    },
    activity: [{
        type: String,
        default: []
    }],
    cover_color: {
        type: String,
        default: 'white'
    },
    list_editing: {
        type: objectId,
        ref: 'EditingList'
    }
}, { timestamps: true })

const task = mongoose.model('Task', taskSchema);

module.exports = task;