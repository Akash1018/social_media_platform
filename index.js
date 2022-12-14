const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
const authenticate = require('./api/login');
const posts = require('./api/post')
const follow = require('./api/follow');
const unfollow = require('./api/unfollow');
const user = require('./api/user');
const like = require('./api/like');
const unlike = require('./api/unlike');
const comment = require('./api/comment');
const all_posts = require('./api/all_posts');
const register = require('./api/register');

dotenv.config();

const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
}).then(() => console.log("Database Connected")).catch((err) => console.log(err));


app.use(express.json());
app.use(cookieParser());
app.use('/api/register', register);
app.use('/api/authenticate', authenticate);
app.use('/api/posts', posts);
app.use('/api/posts', posts);
app.use('/api/posts', posts);
app.use('/api/follow', follow);
app.use('/api/unfollow', unfollow);
app.use('/api/user', user);
app.use('/api/like', like);
app.use('/api/unlike', unlike);
app.use('/api/comment', comment);
app.use('/api/all_posts', all_posts)

app.get("/", (req, res) => {
    res.send("started");
 });

module.exports = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running at ${process.env.PORT}`);
 });