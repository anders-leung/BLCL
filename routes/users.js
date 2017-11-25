var express = require('express');
var async = require('async');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('./../modules/client');
var UserService = require('./../modules/user');

/* GET users listing. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    UserService.getAllUsers(function(err, users) {
        var dict = {};
        async.each(users, function(user, callback) {
            ClientService.findClientsWithUser(user.initials, false, function(err, clients) {
                if (err) {
                    callback(err);
                } else {
                    dict[user.initials] = clients;
                    callback();
                }
            });
        }, function() {
            var list = [];
            Object.keys(dict).sort().forEach(function(key) {
                var entry = [key];
                entry.push(dict[key]);
                list.push(entry);
            });

            res.render('users', { role: req.session.role, list: list, options : null });
        });
    });
});

module.exports = router;
