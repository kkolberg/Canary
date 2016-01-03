var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

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
    console.log(req.body);
    if (req.body.value === 1) {
        leaks["pipe1"] = true;
        request({
            method: 'PUT',
            uri: 'http://thompsonpaul.com:8080/api/36c997c030c1602f2ed53c1028e2281f/lights/4/state',
            body: {
                "on":true,
                "sat":254,
                "bri":254,
                "hue":10000
            }
        });
    } else if (req.body.value === 0) {
        leaks["pipe1"] = false;
        request({
            method: 'PUT',
            uri: 'http://thompsonpaul.com:8080/api/36c997c030c1602f2ed53c1028e2281f/lights/4/state',
            body: {
                "on":true,
                "sat":254,
                "bri":254,
                "hue":30000
            }
        });
    }
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
