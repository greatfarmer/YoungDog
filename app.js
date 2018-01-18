// app.js

// [LOAD PACKAGES]
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var fs = require('fs');
var http = require('http');

// [CONFIGURE ejs]
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// [CONNECT TO MONGODB SERVER]
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

mongoose.connect('mongodb://root:m27771293@ds149040.mlab.com:49040/greatfarmer');

// [DEFINE MODEL]
var Movie = require('./models/movie');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE APP TO USE ejs]
app.use(express.static('public'));

app.use(session({
  secret: '@#@$PATRICK#@#$',
  resave: false,
  saveUninitialized: true
}));

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [CONFIGURE ROUTER]
var router = require('./routes')(app, Movie, fs);

//TODO 아래 코드 지울 것.
// // [CREATE&RUN SERVER]
// app.use(function(req,res) {
//   response.writeHead(200, {‘Content-Type’: ‘text/html; charset=UTF-8’});
//   response.end();
// });
//
// http.createServer(app).listen(port, function() {
//   console.log("Express server has started on port " + port);
// });

// [RUN SERVER]
var server = app.listen(port, function() {
  console.log("Express server has started on port " + port);
});

// [CHECK RUNNING SERVER]
app.get('/', function(req, res) {
  res.send("You are connected on port " + port);
});
