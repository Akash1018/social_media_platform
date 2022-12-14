const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
        userid: String,
        Title:{
            type: String,
            required: true
        },
        Description:{
            type: String,
            max: 400
        },
        likes:{
            type: Array,
            default: [],
        },
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    },
    {timestamps: true}
)

const Post = mongoose.model("UserMessage", PostSchema);

module.exports = Post;