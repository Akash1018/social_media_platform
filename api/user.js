const express = require('express')
const router = express.Router();
const authenticate = require('../middleware/auth');

//get the info of user using jwt.
router.get("/" ,authenticate, async (req,res) => {
    try{
        const {user_name, followers, following} = await req.user;

        res.status(200).send({username:user_name,followers:followers.length,followings:following.length});
    } catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;