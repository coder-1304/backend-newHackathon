const jwt = require('jsonwebtoken')
const User = require('../database/models/userSchema')

const auth = async (req,res,next)=>{
   try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token,'thisIsHackathonProjectForBackendTaskManagement')
    const user = await User.findOne({_id:verifyUser._id});
    console.log(user);
    req.user=user;
    req.token=token;
    next();
   } catch (error) {
    // console.log(error)
    res.send('User Authentication Failed '+ error)
   }
}

module.exports = auth;