const User = require('../../database/models/userSchema');
const path = require('path')
const bcrypt = require('bcrypt')

const authController = {
    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const exists = await User.exists({ email: email });
            if (!exists) {
                res.send('User does not exist');
                res.end();
            }
            const user = await User.findOne({ email: email });
            // const isMatch = await bcrypt.compare(password, user.password);

            if (password == user.password) {
                const token = await user.generateAuthToken();
                res.cookie('jwt', token, {
                    expires: new Date(Date.now() + 50000000),   //in milliseconds 
                    httpOnly: true,
                    // secure: true
                })
                res.redirect('http://localhost:5000/dashboard')
                res.end();
            } else {
                res.send(`<h1>Wrong Password</h1>`)
                res.end();
            }
        } catch (error) {
            res.json(error);
            res.end();
        }
        // res.end();
    },
    async logout(req, res, next) {
        req.user.tokens = [];
        res.clearCookie("jwt");
        await req.user.save();  //saving the cleared cookie
        console.log('logged out successfully');
        res.send('<h1>Logged out successfully</h1>')
        res.end();
    },
    async register(req, res) {
        try {
            console.log('Body is ' + req.body);
            const fName = req.body.fName;
            const lName = req.body.lName;
            const email = req.body.email;
            const phone = req.body.phone;
            const password = req.body.password;
            console.log(email);
            const exists = await User.exists({ email: email });
            if (exists) {
                res.send('User already exists');
                res.end();
                return;
            }
            console.log('11111')
            console.log(password);
            // password = await bcrypt.hash(password, 10)
            console.log('22222')

            const user = new User({
                fName: fName,
                lName: lName,
                email: email,
                password: password,
                phone: phone
            });
            const token = await user.generateAuthToken();
            user.save();
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 50000000),   //in milliseconds 
                httpOnly: true,
            });
            // res.json({
            //     token: token
            // })
            res.redirect('http://localhost:5000/dashboard')
            // res.sendFile(path.join(__dirname, '../../webpages/dashboard.html'))
            // res.end();
        } catch (error) {
            res.send(error);
        }
    },
}

module.exports = authController;