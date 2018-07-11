const express = require('express')
const register = require('./routes/register')
const api = require('./routes/api')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')

const app = express()


app.use(morgan('combine'))
app.use(cors())


var server = app.listen(config.port, function(){
    console.log("Node.js is listening to PORT:" + server.address().port)
})

app.set('view engine', 'ejs')

//app.use('/boards', boards);
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api',api);
app.use('/register', register);
app.use(express.static(__dirname + 'views'));

app.get("/login/", function(req, res, next){
    res.render("index", {});
});
app.post("/login/", function(req, res, next){
    res.send(req.body);
});

app.get("/DrawImage/:user/:classnumber",function(req,res,next){
  res.render("DrawImage",{});
});


app.get("/DrawImage1/:user/:classnumber",function(req,res,next){
  res.render("DrawImage1",{});
});

//exports.app = functions.https.onRequest(app);
