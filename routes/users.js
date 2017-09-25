var express = require('express');
var async = require('async');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('./../modules/client');
var UserService = require('./../modules/user');
var AssignmentService = require('./../modules/assignment');

/* GET users listing. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    UserService.getAllUsers(function(err, users) {
        var dict = {};
        async.each(users, function(user, callback) {
            AssignmentService.findAssignmentByUser(user, function(err, assignments) {
                if (err) {
                    callback(err);
                } else {
                    var client_ids = [];
                    for (var i = 0; i < assignments.length; i++) {
                        client_ids.push(assignments[i].client);
                    }
                    ClientService.findClientsWithIds(client_ids, function(err, clients) {
                        if (err) {
                            callback(err);
                        } else {
                            console.log(user.initials);
                            console.log(clients);
                            dict[user.initials] = clients;
                            callback();
                        }
                    });
                }
            });
        }, function() {
            res.render('users', { role: req.session.role, list: dict });
        });
    });
});

module.exports = router;
