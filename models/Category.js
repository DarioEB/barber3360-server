const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    selected: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Category', categorySchema);