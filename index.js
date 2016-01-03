var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var leaks = {
    pipe1: false
};

app.use(express.static('web/app'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/leaks', function (req, res) {
    res.status(200).send(leaks);
});

app.post('/api/leaks', function (req, res) {
    leaks[req.body.pipe] = req.body.isLeaking;
    res.status(201).send();
});

app.get("*", function (req, res) {
    res.sendFile(__dirname+'/web/dist/index.html');
});

app.listen(3000, function () {
    console.log('Canary is now listening on port 3000');
});
