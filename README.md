***


## React Js
![](https://github.com/sutani/tryout-02/blob/master/reactjs/Screenshot%20from%202017-04-08%2014:49:57.png)

### How to run
**Client**
* Go to react js  directory using `cd reactjs/todo-list`
* Build react js with `npm start`
* _you see full code in : `reactjs/todo-list/src/App.js`_

**Server**
* Go to `reactjs` directory
* If you just clone this repository, you have to install all dependencies using `yarn install` or `npm install`
* Run the server by executing `node server.js`
* ![](https://github.com/sutani/tryout-02/blob/master/reactjs/Screenshot%20from%202017-04-08%2014:50:44.png)
 
**Data server**
```
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
```
## Node Modules

## License
MIT

## Footnote
This repository is created by Sutani Ghifari. Please contact me by email: sutanighifari@gmail.com for further information
