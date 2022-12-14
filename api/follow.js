const express = require('express')
const User = require('../model/User')
const router = express.Router();
const auth = require('../middleware/auth');

//add a follower
router.post("/:id",auth, async (req,res) => {
    if(req.body.userId != req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{following : req.params.id}})

                res.status(200).send("user has been followed")
            }else {
                res.status(403).send("you already follow this user")
            }
        }catch(err){
            console.log(err);
        }
    }else{
        res.status(401).send("invalid")
    }

})

module.exports = router;