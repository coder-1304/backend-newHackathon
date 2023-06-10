const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth/login-register')
const projectController = require('../controllers/card/project')
const auth = require('../middleware/auth');
const User = require('../database/models/userSchema')
router.get('/',(req,res)=>{
    console.log('working');
})
router.get('/login',authController.login);
router.post('/register',authController.register);

// Projects
router.post('/addProject', auth, projectController.addProject);
router.get('/fetchProjects', auth, projectController.fetchProjects);



router.get('/home',auth, (req,res)=>{
    res.send('User Verified')
});






// import { v4 as uuid } from 'uuid';
const uuid = require('uuid').v4;
const multer = require('multer');
let avatar = '';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: async (req, file, cb) => {
        const { originalname } = file;
        // console.log(file);
        const name = `${uuid()}-${originalname}`;
        avatar = name;
        // console.log('Setting Avatar as '+avatar);
        console.log(name);
        cb(null, name)
        // cb(null,`${uuid()}.jpg`)
    }
})

// const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true)  // Accept the file: true
    } else {
        cb(new Error('Incorrect file type: only Image allowed'), false)  // Accept the file: true
    }
}
const upload = multer({ storage, fileFilter, limits: { fileSize: 10000000, files: 2 } })   // fileSize is in bytes:  1MB = 1000000 bytes  & files :2 means max no. of files allowed 

router.post('/upload', upload.array("file"), async (req, res) => {
    console.log(req.body);
    res.send('Success');
})
module.exports = router;