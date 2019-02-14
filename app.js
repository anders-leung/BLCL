var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var session = require('cookie-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

const ConfigService = require('./server/modules/config');
const DescriptionService = require('./server/modules/invoice/description');
const T2Service = require('./server/modules/t2/client');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'node_modules/@fortawesome')));

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

init('./server/routes', async (err) => {
    if (err) console.log('Error in init: ', err);
    
    let config;
    [err, config] = await ConfigService.getConfig();
    if (err) return console.log('init config err: ', err);

    global.t1Directory = config.t1_directory;
    global.invoiceDirectory = config.invoice_directory;
    global.templateDirectory = config.template_directory;
    global.fileDirectory = config.file_directory;
    global.twilio = config.twilio;
    
    // const twilio = require('./server/modules/sms/sms');
    // twilio(null, null, () => {
    //     console.log('finished sending');
    // });

    let descriptions;
    [err, descriptions] = await DescriptionService.get({});
    if (err) return console.log('init description err: ', err);
    if (descriptions.length === 0) {
        await DescriptionService.setup();
    }

    // await T2Service.setup();
    
    var setup = require('./server/routes/utils/setup');
    setup();
    
    var logging = require('./server/logging');

    app.use('/invoices/blcl', express.static(`${global.invoiceDirectory}/BLCL`));
    app.use('/invoices/cantrust', express.static(`${global.invoiceDirectory}/CANTRUST`));

    // error handling must be declared last, or it overrides any other routes.
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
});

// Run all cron jobs
const cron = `${__dirname}/server/modules/cron`;
fs.readdir(cron, (err, list) => {
    list.map((file) => {
        require(`${cron}/${file}`);
    });
});

module.exports = app;