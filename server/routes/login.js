/**
 * Created by ander on 2017-09-18.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var UserService = require('../modules/user');

var previousUrl = '/';
var login_error = false;

router.get('/', function(req, res) {
    previousUrl = '/';
    var urlTokens = req.originalUrl.split('+');
    if (urlTokens.length > 1) previousUrl = urlTokens[1];
    res.render('login', { title : 'BLCL', login_error: login_error});
    login_error = false;
});

router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    UserService.findOneUser({ email: email.toLowerCase(), password: password }, function(err, user) {
        if (err) res.render('error');
        if (user) {
            CookieService.createCookie(req, user.initials, user.role);
            console.log(previousUrl);
            res.redirect(previousUrl);
        } else {
            login_error = true;
            res.redirect('/login');
        }
    });
});

module.exports = router;