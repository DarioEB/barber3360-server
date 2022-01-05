const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barberSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ig: {
        type: String,
        required: true,
        trim: true
    },
    times: {
        type: Array,
        required: false
    },
    image: {
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
    }
});

module.exports = mongoose.model('Barber', barberSchema);