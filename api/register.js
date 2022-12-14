const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { cookie } = require('express/lib/response');
const User = require('../model/User');

//register a new user
router.post('/', async (req,res) => {
try {

        const {user_name, email, password} = req.body;

        if(!(email && password && user_name)){
            res.status(400).send('All input is required');
        }

      
        const oldUser = await User.findOne({ email });
       
        if(oldUser){
            return res.status(409).send("User Already Exist. Please Login");
        }
        
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            user_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = await jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
  
        user.token = token;
        res.status(201).send(user);
    }catch(err){
    res.status(500).send(err)
   }
})

module.exports = router;