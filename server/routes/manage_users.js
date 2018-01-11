/**
 * Created by ander on 2017-11-17.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var UserService = require('../modules/user');

router.get('/', CookieService.isLoggedIn, function(req, res) {
    if (CookieService.readCookie(req).role != 'Administrator') {
        res.redirect('/');
    }
    UserService.getAllUsers(function(err, users) {
        if (err) res.render('error');
        res.render('manage_users', { title : 'BLCL', users : users, roles : UserService.getRoles(), role : req.session.role });
    });
});

module.exports = router;