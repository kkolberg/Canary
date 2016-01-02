var express = require('express');
var app = express();

app.use(express.static('web'));

app.get('/api', function (req, res) {
    res.send('Hello Canary API!');
});

app.listen(3000, function () {
    console.log('Canary is now listening on port 3000');
});