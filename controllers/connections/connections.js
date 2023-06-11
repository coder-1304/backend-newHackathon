const User = require('../../database/models/userSchema');
const Project = require('../../database/models/projectSchema');

const connectionController = {
    async sendConnectionRequest(req, res) {
        try {
            console.log('Adding New Project')
            const email = req.body.email;
            console.log(email);
            if (req.user.email === email || req.user.connections.includes(email)) {
                res.send('Invalid request');
                return;
            }
            console.log('0')

            const person = await User.findOne({ email: email });
            console.log('1')
            for (let i = 0; i < person.connectionReq.length; i++) {
                if (person.connectionReq[i].email == req.user.email) {
                    res.end();
                    return;
                }
            }
            console.log('2')
            const name = `${req.user.fName} ${req.user.lName}`
            await person.connectionReq.push({ email: req.user.email, name: name });
            console.log('3')

            await person.save();
            console.log('4')
            res.json({
                success: true
            })
            res.end()
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
    async acceptConnectionRequest(req, res) {
        try {
            const email = req.body.email;
            // const name = req.body.name;
            const connectionReq = req.user.connectionReq;
            for (let i = 0; i < connectionReq.length; i++) {
                if (connectionReq[i].email == email) {
                    connectionReq.splice(i, 1);
                }
            }
            const user = await User.findOne({ email: email });
            const name = `${user.fName} ${user.lName}`;
            req.user.connectionReq = connectionReq;
            const data = {
                email: email,
                name: name
            }
            req.user.connections.push(data);
            const newData = {
                email: req.user.email,
                name: `${req.user.fName} ${req.user.lName}`
            }
            user.connections.push(newData);
            req.user.save();
            user.save();
            res.json({ success: true })
            res.end();
        } catch (error) {
            res.send(error);
        }
    },
    async fetchConnections(req, res) {
        try {
            res.json(req.user.connections);
            res.end();
        } catch (error) {
            res.send(error);
        }
    },
    async searchConnection(req, res) {
        try {
            const email = req.body.email;
            const name = req.body.name;

            let fName = "&&&&";
            let lName = "&&&&";
            var parts = name.split(" ");
            if (parts.length == 1) {
                fName = name;
            } else {
                fName = parts[0];
                lName = parts[1];
            }

            console.log(lName); // Output: "abc"
            console.log(fName); // Output: "def"

            const results = await User.find({
                $or: [
                    { email: email },
                    { fName: fName },
                    { lName: lName }
                ]
            })
            res.json(results);
            res.end();
        } catch (error) {
            res.send(error);
        }
    },
}

module.exports = connectionController;