/**
 * Created by ander on 2017-09-18.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var UserService = require('./../modules/user');

var previousUrl = '/';

router.get('/', function(req, res) {
    previousUrl = '/';
    var urlTokens = req.originalUrl.split('+');
    if (urlTokens.length > 1) previousUrl = urlTokens[1];
    res.render('login', { title : 'BLCL' });
});

router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    UserService.findOneUser({ email: email, password: password }, function(err, user) {
        if (err) {
            res.render('login');
        }
        if (user) {
            CookieService.createCookie(req, user.initials, user.role);
            console.log(previousUrl);
            res.redirect(previousUrl);
        }
    });
});

module.exports = router;