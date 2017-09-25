/**
 * Created by ander on 2017-09-18.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('./../modules/client');
var UserService = require('./../modules/user');
var AssignmentService = require('./../modules/assignment');

router.get('/', CookieService.isLoggedIn, function(req, res) {

    var query = {
        'email' : req.session.email
    };

    UserService.findOneUser(query, function(err, user) {
        AssignmentService.findAssignmentByUser(user, function(err, assignments) {
            var client_ids = [];
            for (var i = 0; i < assignments.length; i++) {
                client_ids.push(assignments[i].client);
            }
            ClientService.findClientsWithIds(client_ids, function(err, clients) {
                if (err) {
                    res.render('error');
                }
                res.render('clients', { clients : clients, statuses : ClientService.getStatuses()});
            });
        });
    });
});

module.exports = router;