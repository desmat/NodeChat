var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
// var sessionStore = new express.session.MemoryStore();
var sessionstore = require('sessionstore');

//var MemoryStore = require('connect/middleware/session/memory');
// var EXPRESS_SID_KEY = 'express.sid';
// var COOKIE_SECRET = 'very secret string';
// var cookieParser = express.cookieParser(COOKIE_SECRET);
// var sessionStore = new express.session.MemoryStore();

var routes = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.session({store: sessionStore, secret: "mysecret"}));
// app.use(session({secret: "mysecret"}));
// app.use(express.session({
//     store: sessionstore.createSessionStore()
// }));
app.use(session({
    store: sessionstore.createSessionStore(),
    secret: 'cat keyboard'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// This endpoint reveals it
app.get("/session", function(req, res){
  var counter = req.session.counter;

  if (typeof counter === 'undefined') {
    counter = 1;
  }

  req.session.counter = counter + 1;

  // res.send(counter);
  // console.dir(req.session);
  // console.log(req.session.counter);
  res.send("counter: " + counter);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
