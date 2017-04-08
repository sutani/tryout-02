var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var lists = [];
app.get('/api/todolist', function(req, res) {
    const response = {
        data: lists
    }
    res.send(response);
});
app.post('/api/todolist', function(req, res) {
    var user_id = req.body.id;
    var item = req.body.text;
    var listItem = {
        id: user_id,
        text: item
    }

    res.set('Access-Control-Allow-Origin', '*')
    lists.push(listItem);
    res.send(user_id + item + 'has been received');
});

// start the server
app.listen(port);
console.log('Server localhost :' + port);