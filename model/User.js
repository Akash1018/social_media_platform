const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    user_name:{
        type: String,
        default: null
    },
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String,
        default: null
    },
    followers:{
        type: Array,
        default: []
    },
    following:{
        type: Array,
        default: []
    },
    posts:[
        {
        post_id: String,
        created_Time: Date
        }
    ]
},{timestamps: true}
)

const User = mongoose.model('PostMessage', UserSchema);

module.exports = User;