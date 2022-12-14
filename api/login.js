const express = require('express')
const User = require('../model/User')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { saveCookies } = require('superagent');

//login authentication
router.post("/",async (req,res) => {
   try{
        const { email, password } = req.body;

        if(!(email && password)) {
            res.status(400).send("All inputs are required");
        }

        const user = await User.findOne({ email });

        if(user && (await bcrypt.compare(password,user.password))){

            const token =jwt.sign(
                {user_id: user._id,email},
                process.env.TOKEN_KEY,
                {
                    expiresIn:"2h",
                }
            );
            
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 604800000),         // expires in 1 week
                httpOnly: true,
             });

            user.token = token;
            //console.log(req.cookies.access_token);

            res.status(200).send({token: token});
        }
        else{
            res.status(400).send("Invalid");
        }
   } catch(error){
            console.log(error);
   }
})

module.exports = router;