/**
 * Created by ander on 2017-09-18.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var UserService = require('../modules/user');

router.get('/*', function(req, res) {
    const { login_error } = req.query;
    req.session = null;
    res.render('login', { 
        title : 'BLCL', 
        options: {},
        role: null,
        login_error,
    });
});

router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    UserService.findOneUser({ email: email.toLowerCase(), password: password }, function(err, user) {
        if (err) res.render('error');
        if (user) {
            CookieService.createCookie(req, user.initials, user.role);
            res.redirect('/');
        } else {
            res.redirect('/login?login_error=true');
        }
    });
});

module.exports = router;