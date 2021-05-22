const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objectId = Schema.Types.ObjectId;

const BoardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    member: [{
        type: objectId,
        ref: 'User',
        default: []
    }],
    user: {
        type: objectId,
        ref: "User"
    },
    star: {
        type: Boolean,
        default: false,
    },
    closed: {
        type: Boolean,
        required: true,
        default: false,
    },
    column: [{
        type: objectId,
        ref: 'EditingList',
        default: []
    }]
    // collection: {
    //     type: Array,
    //     default: []
    // }
}, { timestamps: true })

const board = mongoose.model('Board', BoardSchema);
module.exports = board;