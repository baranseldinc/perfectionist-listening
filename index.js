const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/main.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/main.js'));
});

app.get('/survey.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/survey.html'));
});

app.get('/survey.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/survey.js'));
});

app.get('/persistence.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/persistence.js'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);