const User = require('../../database/models/userSchema');
const Project = require('../../database/models/projectSchema');
const Task = require('../../database/models/tasksSchema');
const path = require('path');
require('cookie-parser')
const tasksController = {
    async tasksPage(req, res) {
        try {
            const projectId = req.params.id;
            res.cookie('projectId', projectId, {
                expires: new Date(Date.now() + 50000000),   //in milliseconds 
                httpOnly: true,
            });

            console.log('Sending example')
            console.log(req.cookies.projectId)
            res.sendFile(path.join(__dirname, '../../webpages/tasks-list.html'))
        } catch (error) {
            res.send(error);
        }
    },
    async addTask(req, res) {
        try {
            const projectId = req.cookies.projectId;
            console.log(req.user.name)
            const task = new Task({
                name: req.body.name,
                projectId: projectId,
                ownerName: `${req.user.fName} ${req.user.lName}`
            })
            await task.save();
            res.json({
                success: true
            })
            res.end();
        } catch (error) {
            res.send(error);
        }
    },
    async fetchProjectTasks(req, res) {
        try {
            const projectId = req.cookies.projectId;
            const tasks = await Task.find({ projectId: projectId });
            res.json(tasks);
            res.end();
        } catch (error) {
            res.send(error);
        }
    },
    async saveCookies(req, res) {
        try {
            const taskId = req.params.id;
            res.cookie('taskId', taskId, {
                expires: new Date(Date.now() + 50000000),   //in milliseconds 
                httpOnly: true,
            });
            res.end();
        } catch (error) {
            res.send(error);
        }
    },
    async taskDetails(req, res) {
        try {
            const taskId = req.cookies.taskId;
            console.log('Task Id from cookies is '+taskId);
            const task = await Task.findOne({_id: taskId});
            res.json(task);
            res.end();
        } catch (error) {
            res.send(error);
        }
    },
}

module.exports = tasksController;