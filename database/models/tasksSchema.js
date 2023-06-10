const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const taskSchema = new mongoose.Schema({
    name: {
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

const Task = new mongoose.model('Task',taskSchema);

module.exports = Task;