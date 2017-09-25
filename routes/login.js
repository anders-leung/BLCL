/**
 * Created by ander on 2017-09-18.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var UserService = require('./../modules/user');

router.get('/', function(req, res) {
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
            CookieService.createCookie(req, user.email, user.role);
            res.redirect('/');
        }
    });
});

module.exports = router;