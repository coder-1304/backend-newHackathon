const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded());
const routes = require('./routes/index.js')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use('/',routes);
const port = 5000;
require('./database/db/connection')

app.listen(port,()=>{
    console.log('Server Running on port '+port);
})