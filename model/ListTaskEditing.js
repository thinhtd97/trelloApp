const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objectId = Schema.Types.ObjectId;

const listTaskEditingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    list_task: [{
        type: objectId,
        ref: 'Task',
        default: []
    }],
    idBoard: {
        type: objectId,
        ref: "Board"
    }
}, { timestamps: true })



const ListEditing = mongoose.model('EditingList', listTaskEditingSchema);
module.exports = ListEditing;