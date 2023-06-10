const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth/login-register')
const auth = require('../middleware/auth');
const User = require('../database/models/userSchema')
router.get('/',(req,res)=>{
    console.log('working');
})
router.get('/login',authController.login);
router.post('/register',authController.register);
router.get('/home',auth, (req,res)=>{
    res.send('User Verified')
});

module.exports = router;