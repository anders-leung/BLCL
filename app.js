var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var session = require('cookie-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var new_user = require('./routes/new_user');
var excel = require('./routes/api/excel');
var client = require('./routes/client');

mongoose.connect('mongodb://localhost:27017/');

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
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name : 'session',
  keys : ['email', 'role'],
  maxAge : 60 * 60 * 1000
}));

app.use('/', index);
app.use('/users', users);
app.use('/new_user', new_user);
app.use('/loadExcel', excel);
app.use('/client', client);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var User = require('./models/User');
var admin = new User();
admin.email = 'georgia@ben-cpa.com';
admin.password = 'adminPassword';
admin.role = 'Administrator';
admin.save();

module.exports = app;
