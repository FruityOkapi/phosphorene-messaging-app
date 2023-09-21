const { Schema } = require('mongoose');

const notificationSchema = new Schema({
    acceptable: {
        type: Boolean,
        required: true,
    },
    content: {
        type: String,
        required: true,

    }
});

module.exports = { notificationSchema }