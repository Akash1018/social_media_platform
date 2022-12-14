const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
    }
})

const comment = mongoose.model('Comment', CommentSchema);

module.exports = comment;