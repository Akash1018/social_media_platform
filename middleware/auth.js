const jwt = require("jsonwebtoken");
const User = require("../model/User");

//Authentication
const auth = async (req, res, next) => {
     try{
        const token = req.cookies.jwt;

        const verifyUser = jwt.verify(token, process.env.TOKEN_KEY);
        
        const user = await User.findOne({_id:verifyUser.user_id});

        if(!user){
           res.status(500).send("User not found")
        }
        req.token = token;
        req.user = user;
        next();
     } catch(error){
        res.status(401).send(error);
     }
}

module.exports = auth;