const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../model/Post');
const Comment = require('../model/Comment');

//Add comment in a post
router.post('/:id',auth, async (req,res) => {
    try{
        const { text } = req.body;
        
        const comment = await Comment.create({
            text,
        })

        const post = await Post.findById(req.params.id);
        if(post){
            await post.updateOne({$push:{comments: comment._id}},{new: true});

            res.status(200).json(comment._id);
        }
        else{
        res.status(400).json("post not available");
        }
    } catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;