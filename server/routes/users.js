var express = require('express');
var async = require('async');
var router = express.Router();
var to = require('../helpers/to');

var CookieService = require('./utils/cookies');
var ClientService = require('../modules/t1/client');
var UserService = require('../modules/user');

/* GET users listing. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    if (CookieService.readCookie(req).role != 'Administrator') {
        res.redirect('/');
    }
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
        }, async function() {
            var list = [];
            Object.keys(dict).sort().forEach(function(key) {
                var entry = [key];
                entry.push(dict[key]);
                list.push(entry);
            });

            [err, initials] = await UserService.getInitials();
            res.render('users', {
                role: req.session.role,
                list: list,
                options : { 
                    initials: initials,
                    status: ClientService.getStatuses()
                }
            });
        });
    });
});

module.exports = router;
