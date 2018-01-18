/**
 * Created by ander on 2018-01-13.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./../utils/cookies');
var ClientService = require('../../modules/client');

router.get('/', CookieService.isLoggedIn, function(req, res) {
    ClientService.findAllClients(function(err, clients) {
        res.render('t1/directory', {
            clients: clients,
            role: req.session.role
        });
    });
});

module.exports = router;