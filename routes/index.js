const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth/login-register')
const projectController = require('../controllers/card/project')
const auth = require('../middleware/auth');
const User = require('../database/models/userSchema')
const Task = require('../database/models/tasksSchema')
const path = require('path');
const Project = require('../database/models/projectSchema');
const connectionController = require('../controllers/connections/connections');
const tasksController = require('../controllers/tasks/tasksController');

// router.get('/', (req, res) => {
//     console.log('working');
// })
// Auth
// router.get('/login', authController.login);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/dashboard', auth, async (req, res) => {
    res.sendFile(path.join(__dirname, '../webpages/dashboard.html'))
});
router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../webpages/landingpage.html'))
});

// Projects
router.get('/fetchProjects', auth, projectController.fetchProjects);

// Connections:
router.post('/sendConnectionRequest', auth, connectionController.sendConnectionRequest);
router.post('/acceptConnectionRequest', auth, connectionController.acceptConnectionRequest);
router.get('/fetchConnections', auth, connectionController.fetchConnections);
router.post('/searchConnection', auth, connectionController.searchConnection);
router.get('/connectionReq', auth, async(req,res)=>{
    const result = await req.user.connectionReq;
    console.log('Request for connection are::::');
    console.log(result);
    console.log(req.user);

    res.json(result);
    res.end();
});

// Managing Members
router.post('/addMembers', auth, projectController.addProject);

router.get('/registerPage', (req, res) => {
    res.sendFile(path.join(__dirname, '../webpages/register.html'))
});
router.get('/loginPage', (req, res) => {
    res.sendFile(path.join(__dirname, '../webpages/login.html'))
});
router.get('/taskDetails', auth, tasksController.taskDetails);
router.get('/taskDetailsPage', auth, async (req, res) => {
    res.sendFile(path.join(__dirname, '../webpages/taskDetails.html'))
});
router.get('/addProjectPage', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../webpages/addProject.html'))
});
router.get('/viewTasks/:id', auth, tasksController.tasksPage);
router.get('/tasksDetails/:id', auth, tasksController.tasksPage);
router.get('/fetchProjectTasks', auth, tasksController.fetchProjectTasks);
router.get('/saveCookies/:id', auth, tasksController.saveCookies);
router.post('/addTask', auth, tasksController.addTask);


router.get('/connections', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../webpages/connections.html'))
});

router.get('/getFile/:fileName', (req, res) => {
    res.sendFile(path.join(__dirname, `../uploads/${req.params.fileName}`))
});
// import { v4 as uuid } from 'uuid';
const uuid = require('uuid').v4;
const multer = require('multer');
let fileName = '';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: async (req, file, cb) => {
        const { originalname } = file;
        // console.log(file);
        const name = `${uuid()}-${originalname}`;
        fileName = name;
        // console.log('Setting Avatar as '+avatar);
        console.log(name);
        cb(null, name)
        // cb(null,`${uuid()}.jpg`)
    }
})

// const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // if (file.mimetype.split("/")[0] === "image") {
    //     cb(null, true)  // Accept the file: true
    // } else {
    //     cb(new Error('Incorrect file type: only Image allowed'), false)  // Accept the file: true
    // }
    cb(null, true)
}
const upload = multer({ storage, fileFilter, limits: { fileSize: 10000000, files: 2 } })   // fileSize is in bytes:  1MB = 1000000 bytes  & files :2 means max no. of files allowed 

router.post('/upload', upload.array("file"), async (req, res) => {
    console.log(req.body);
    fileName = ''
    res.send('Success');
})



router.post('/addProject', auth, upload.array("file"), async (req, res) => {
    try {
        console.log('Adding New Project')
        console.log(req.body);
        const title = req.body.title;
        const description = req.body.description;
        const ownerId = req.user._id;
        // const membersId= req.body.
        const deadline = req.body.deadline;
        const status = req.body.status;
        // const options= req.body
        const project = new Project({
            title: title,
            banner: fileName,
            ownerId: ownerId,
            description: description,
            deadline: deadline,
            status: 'To Do',
            owner: `${req.user.fName} ${req.user.lName}`
        })
        console.log(project);
        await project.save();
        // res.json({
        //     result: 'Success'
        // })
        // res.end();
        fileName = ''
        res.redirect('http://localhost:5000/dashboard');
    } catch (error) {
        res.send(error);
    }
});


router.post('/updateTaskDetails', auth, upload.array("file"), async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.body.name)
        console.log(req.body.description)
        const id = await req.cookies.taskId;
        await Task.updateOne(
            { _id: id },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    banner: `getFile/${fileName}`
                }
            }
        );
        fileName = ''
        res.json({
            success: true
        })
    } catch (error) {
        console.log(error);
    }
})
router.post('/updateTaskDiscussion', auth, upload.array("file"), async (req, res) => {
    try {
        console.log(req.body)
        // console.log(req.body.file)
        if (fileName == '') {
            console.log('File will not be stored in backend')
        } else {
            console.log('File will be stored in backend!!!')

        }
        const discussion = await {
            name: `${req.user.fName} ${req.user.lName}`,
            comment: req.body.comment,
            fileLink: `getFile/${fileName}`
        }
        const id = await req.cookies.taskId;
        await Task.updateOne({ _id: id }, { $push:{
            discussion: discussion
        }})
        res.json({success: true});
        res.end();
        // console.log(req.body.name)
        // console.log(req.body.description)
        // const id = await req.cookies.taskId;
        // await Task.updateOne(
        //     { _id: id },
        //     {
        //         $set: {
        //             name: req.body.name,
        //             description: req.body.description,
        //             banner: `getFile/${fileName}`
        //         }
        //     }
        // );
        // res.json({
        //     success: true
        // })
    } catch (error) {
    console.log(error);
}
})


module.exports = router;