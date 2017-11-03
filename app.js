var express = require('express');
var mongoose = require('mongoose');
var uniqueArrayPlugin = require('mongoose-unique-array');
var path = require('path');
var session = require('cookie-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var setup = require('./routes/setup');
var index = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/users');
var excel = require('./routes/excel');
var client = require('./routes/client');
var clients = require('./routes/clients');
var payment = require('./routes/payment');

mongoose.Promise = require('bluebird');
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
app.use('/setup', setup);
app.use('/login', login);
app.use('/users', users);
app.use('/loadExcel', excel);
app.use('/client', client);
app.use('/clients', clients);
app.use('/payment', payment);

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

var setup = require('./routes/utils/setup');
setup();

/*
var ClientService = require('./modules/client');
ClientService.findClient({ 'fileName' : 'ZHU, YAN JIE' }, function(err, client) {
    if (!err) {
        var writeFile = require('./modules/write_excel');
        writeFile('C://Users//ander//Desktop//BLCL Files//Test files//ZHU, YAN JIE.xlsx', client[0]);
    }
});
*/
module.exports = app;
