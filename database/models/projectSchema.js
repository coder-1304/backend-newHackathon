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
    membersId: {
        type: String,
        require: true,
    },
    deadline: {
        type: String,
        require: true,
    },
    ownedProjects: {
        type: Array,
        default: [],
    },
    memberOfProjects: {
        type: Array,
        default: [],
    },
    status: {
        type: String,
        default: "toDo",
    },
    options: {
        type: Array,
        default: [],
    },
})

const Project = new mongoose.model('Project',projectSchema);

module.exports = Project;