var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var session = require('cookie-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

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
    keys : ['initials', 'role'],
    maxAge : 12 * 60 * 60 * 1000
}));

let init = (dir, done) => {
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null);
        list.forEach(file => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    init(file, err => {
                        if (!--pending) done(null);
                    });
                } else {
                    if (!file.includes('utils')) {
                        let route = file.split('routes')[1].replace(/\\/g, '/').replace(/\.js/g, '');
                        file = './server/routes' + route;
                        if (route.includes('index')) route = '/';
                        if (route.includes('login')) route = '/login*';
                        app.use(route, require(file));
                    }
                    if (!--pending) done(null);
                }
            });
        });
    });
};

init('./server/routes', err => {
    if (err) console.log('Error in init: ', err);
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
    
    var logging = require('./server/logging');
    
});

module.exports = app;