const { Schema } = require('mongoose');

const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    sentBy: {
        type: String,
        required: true,
    },
    sentTo: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        required: true,
        default: false,
    }
});

module.exports = { messageSchema }