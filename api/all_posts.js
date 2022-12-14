const express = require('express')
const User = require('../model/User')
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../model/Post');

//return id,title,desc,created_at,comments,likes.
router.get('/',auth, async (req,res) => {
    try{
       const id = req.user._id;
       const user = await User.findById(id);
       const post = user.posts;
        
       post.sort(function(obj1,obj2) {
        return obj1.createdAt - obj2.createdAt;
       })
       const out = [];

       await Promise.all(post.map(async (item, index) => {
        try{
            const post = await Post.findById(item.post_id);
            const obj ={
               "id": post._id,
               "title": post.Title,
               "desc" : post.Description,
               "created_at": post.createdAt,
               "comments": post.comments.length,
               "likes": post.likes.length
            }
            out.push(obj);
        } catch(error){
            res.status(500).send(error);
        }
       }))
       res.status(200).send(out);
    } catch(error){
        res.status(500).send(error);
    }
})


module.exports = router;