const express = require('express');
const app = express();
const port = 8080;
const router = require('./router');

app.use('/api', router);

app.listen(port, () => {
    console.log('server started at',port)
})

module.exports = app;