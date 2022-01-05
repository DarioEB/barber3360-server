const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    time: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Time', timeSchema);