var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var leaks = {
    pipe1: {
        isLeaking: false
    }
};

var counter = 0;

app.use(express.static('web/app'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/leaks', function (req, res) {
    counter++;
    if (counter >= 10) {
        leaks.pipe1.isLeaking = !leaks.pipe1.isLeaking;
        counter = 0;
    }
    res.status(200).send(leaks);
});

app.post('/api/leaks', function (req, res) {
    leaks[req.body.pipe] = req.body.isLeaking;
    res.status(201).send();
});

app.post('/api/areas/mark', function (req, res) {
    var isBad = req.body.isBad;
    console.log("marked area isBad:" + isBad);
    res.status(201).send();
});

app.get("/dispatcher", function (req, res) {
    res.sendFile(__dirname + '/dispatcher/dist/index.html');
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + '/web/dist/index.html');
});

app.listen(8080, function () {
    console.log('Canary is now listening on port 8080');
});
