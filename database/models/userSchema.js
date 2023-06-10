const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        require: true,
    },
    lName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
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
    tokens: [{
        token:{
            type: String,
            require: false
        }
    }]
})

userSchema.methods.generateAuthToken = async function (){
    try {
        const token = jwt.sign({_id: this._id.toString()},'thisIsHackathonProjectForBackendTaskManagement')
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        console.log('Generated token: '+token);
        return token;
    } catch (error) {
        console.log(error);
    }
}

const User = new mongoose.model('User',userSchema);

module.exports = User;