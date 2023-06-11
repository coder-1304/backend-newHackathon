const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    projectId: {
        type: String,
        require: true,
    },
    ownerName: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        default: ""
    },
    banner: {
        type: String,
        default: "",
    },
    membersId: {
        type: Array,
        default: []
    },
    // deadline: {
    //     type: String,
    //     require: true,
    // },
    status: {
        type: String,
        default: "toDo",
    },
    discussion:{
        type: Array,
    }
})

const Task = new mongoose.model('Task',taskSchema);

module.exports = Task;