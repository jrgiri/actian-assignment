const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const port = 8080;
const router = require('./router');
//app.use(bodyParser())

app.use('/api', router);

app.listen(port, () => {
    console.log('server started at',port)
})

module.exports = app;