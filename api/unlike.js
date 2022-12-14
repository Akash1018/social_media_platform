const express = require('express')
const User = require('../model/User')
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../model/Post');

//unlike a post
router.post("/:id",auth, async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        const id = req.user._id;

        if(!post){
            res.status(401).send("post not found");
        }
        else{
            if(post.likes.includes(id)){
                await post.updateOne({$pull:{likes:id}});
                
                res.status(200).send("post is unliked");
            }
            else{
                res.status(401).send("post is not liked");
            }
        }
    } catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;