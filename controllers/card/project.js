const User = require('../../database/models/userSchema');
const Project = require('../../database/models/projectSchema');

const projectController = {
    async addProject(req, res) {
        try {
            console.log('Adding New Project')
            const title = req.body.title;
            const description = req.body.description;
            const ownerId = req.user._id;
            // const membersId= req.body.
            const deadline = req.body.deadline;
            const status = req.body.status
            // const options= req.body
            const project = new Project({
                title: title,
                ownerId: ownerId,
                description: description,
                deadline: deadline,
                status: 'To Do',
                owner: `${req.user.fName} ${req.user.lName}`
            })
            console.log(project);
            project.save();
            // res.json({
            //     result: 'Success'
            // })
            // res.end();
            res.redirect('http://localhost:5000/dashboard');
        } catch (error) {
            res.send(error);
        }
    },
    async fetchProjects(req, res) {
        try {
            const project = await Project.find({ownerId: req.user._id})
            // project.save();
            res.json({project})
            res.end();
        } catch (error) {
            res.send(error);
        }
    },
}

module.exports = projectController;