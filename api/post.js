const express = require('express')
const User = require('../model/User')
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../model/Post');

//add a post
router.post("/", auth, async (req,res) => {
    try{
       const { Title, Description } = req.body;
       const userid = req.user._id;

       if(!Title){
           res.status(400).send("Title required");
       }

       const post = await Post.create({
           userid: req.user._id,
           Title,
           Description
       });

       const user = await User.findById(userid);

       await user.updateOne({$push: {posts:{post_id: post._id,created_Time: post.createdAt}}});

       res.status(200).send({Post_ID: post._id,Title: post.Title,Description:post.Description,created_Time: post.createdAt});
    } catch(error){
           res.status(500).send(error);
    }
})

//delete a post
router.delete('/:id',auth, async (req,res) => {
    try{
        const post = await Post.findById( req.params.id );
        const user = await User.findById(post.userid);

        if(!post){
            res.status(403).send("Post not found")
        }
        
        await Post.deleteOne({_id: req.params.id}); 
        await user.posts.splice(user.posts.findIndex(a => a.post_id === req.params.id), 1)

        await user.save();
        res.status(200).send({postId: req.params.id});
    } catch(error){
        res.status(500).send(error);
    }
})

// fetch a post with given id
router.get('/:id',auth, async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post){
            const {_id, likes,comments} = post;

            res.status(200).json({likes:likes.length,comments:comments.length})
        }else {
        res.status(404).json("no post available");
        }
    } catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;