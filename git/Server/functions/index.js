//const functions = require('firebase-functions');
const express = require('express');
//var boards = require('./routes/boards');
var register = require('./routes/register');
var api = require('./routes/api');
var bodyParser = require('body-parser');

const app = express();

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.set('view engine', 'ejs');

//app.use('/boards', boards);
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api',api);
app.use('/register', register);
app.use(express.static(__dirname + 'views'));

app.get("/login/", function(req, res, next){
    res.render("index", {});
});
app.post("/login/", function(req, res, next){
    res.render("index", {});
});

app.get("/DrawImage/:user/:classnumber",function(req,res,next){
  res.render("DrawImage",{});
});


app.get("/DrawImage1/:user/:classnumber",function(req,res,next){
  res.render("DrawImage1",{});
});


//exports.app = functions.https.onRequest(app);
