const express = require('express');
var apiRoutes = require('./src/api-routes');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017/hkrerth');
var db = mongoose.connection;

var port = process.env.PORT || 8080;

app.get('/',(req,res) => {
    res.send('Hello World!');
});

app.use('/api',apiRoutes);

app.listen(port, () => {
    console.log("App listening on port"+ port);
});


