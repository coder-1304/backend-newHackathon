const mongoose = require('mongoose')
mongoose.set('strictQuery',false);
mongoose.connect('mongodb://127.0.0.1:27017/prosquadron').then(()=>{
    console.log('Connected to mongodb');
}).catch((error)=>{
    console.log(error);
})