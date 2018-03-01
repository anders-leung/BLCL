var express = require('express');
var mongoose = require('mongoose');
var uniqueArrayPlugin = require('mongoose-unique-array');
var path = require('path');
var session = require('cookie-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var setup = require('./server/routes/setup');
var index = require('./server/routes/index');
var t1 = require('./server/routes/t1/monitoring_sheet');
var t1_directory = require('./server/routes/t1/directory');
var t1_efiled = require('./server/routes/t1/t1_efiled');
var gst_efiled = require('./server/routes/t1/gst_efiled');
var t2 = require('./server/routes/t2');
var t4 = require('./server/routes/t4');
var t5 = require('./server/routes/t5');
var login = require('./server/routes/login');
var users = require('./server/routes/users');
var client = require('./server/routes/client');
var clients = require('./server/routes/clients');
var payment = require('./server/routes/payment');
var manage_users = require('./server/routes/manage_users');
var staff_analysis = require('./server/routes/staff_analysis');
var update_models = require('./server/routes/update_models');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

app.use(session({
    name : 'session',
    keys : ['email', 'role'],
    maxAge : 12 * 60 * 60 * 1000
}));

app.use('/', index);
app.use('/t1', t1_directory);
app.use('/t1/monitoring', t1);
app.use('/t1/t1_efiled', t1_efiled);
app.use('/t1/gst_efiled', gst_efiled);
app.use('/t2', t2);
app.use('/t4', t4);
app.use('/t5', t5);
app.use('/setup', setup);
app.use('/login*', login);
app.use('/users', users);
app.use('/client', client);
app.use('/clients', clients);
app.use('/payment', payment);
app.use('/manage_users', manage_users);
app.use('/staff_analysis', staff_analysis);
app.use('/update_models', update_models);

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

var setup = require('./server/routes/utils/setup');
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
