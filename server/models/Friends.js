const { Schema } = require('mongoose');
const Messages = require('./Messages');

const friendSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    chat: [Messages],
})

module.exports = {friendSchema}