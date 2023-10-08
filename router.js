const express = require('express');
const app = express();
const {careersPage} = require('./controller/careersPageController');

app.get('/', (req, res) => {
    res.send("Welcome");
})

app.get('/careers/:department', careersPage);

module.exports = app;