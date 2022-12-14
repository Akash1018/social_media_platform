const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../model/Post');

//like a post
router.post('/:id',auth, async (req,res) => {
    try{
        const post = await Post.findById( req.params.id );
        if(!post){
            res.status(401).send("No post present");
        }

        const userid = req.user._id;
        if(!post.likes.includes(userid)){
            await post.updateOne({$push:{likes: userid}});

            res.status(200).send(`Liked the post: ${userid}`)
        }
        else{
            res.status(403).send("you already liked the post")
        }
    } catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;