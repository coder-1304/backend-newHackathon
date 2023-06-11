const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    ownerId: {
        type: String,
        require: true,
    },
    banner: {
        type: String,
    },
    owner: {
        type: String,
        require: true,
    },
    membersId: {
        type: Array,
        default: []
    },
    banner: {
        type: String,
        require: false
    },
    deadline: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        default: "toDo",
    },
    tasksId: {
        type: Array,
        default: [],
    },
    options: {
        type: Array,
        default: [],
    },
})

const Project = new mongoose.model('Project',projectSchema);

module.exports = Project;