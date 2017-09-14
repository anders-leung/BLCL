var express = require('express');
var async = require('async');
var router = express.Router();

var ClientService = require('./api/client');
var UserService = require('./api/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    UserService.getAllUsers(function(err, users) {
        var dict = {};
        async.each(users, function(user, callback1) {
            ClientService.findClients(user.clients, function(err, clients) {
                if (err) {
                    callback1(err);
                } else {
                    dict[user.initials] = clients;
                    callback1();
                }
            });
        }, function() {
            res.render('users', { role: req.session.role, list: dict });
        });
    });
});

module.exports = router;
