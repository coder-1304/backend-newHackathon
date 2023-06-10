const User = require('../../database/models/userSchema');

const authController ={
    async login(req,res){
        try {
            res.send('Loggin in')
        } catch (error) {
            
        }
    },
    async register(req,res){
        try {
            console.log('Body is '+req.body);
            const fName = req.body.fName;
            const lName = req.body.lName;
            const email = req.body.email;
            const phone = req.body.phone;
            const password = req.body.password;
            const exists = await User.exists({email: email});
            if(exists){
                res.send('User already exists')
                res.end();
                return;
            }
            const user = new User({
                fName: fName,
                lName: lName,
                email: email,
                password: password,
                phone: phone
            });
            const token = await user.generateAuthToken();
            user.save();
            res.json({
                token: token
            })
            res.end();
        } catch (error) {
            res.send(error);
        }
    },
}

module.exports = authController;