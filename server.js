const express = require('express')
const app = express();
const routes = require('./routes/index')
app.use(express.json());
app.use('/',routes);
const port = 5000;
require('./database/db/connection')

app.listen(port,()=>{
    console.log('Server Running on port '+port);
})