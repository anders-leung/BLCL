/**
 * Created by ander on 2017-11-01.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('../modules/t1/client');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    var role = CookieService.readCookie(req).role;
    if (role != 'Administrator') {
        res.redirect('/');
    }
    ClientService.findClientsPytRec(function(err, clients) {
        res.render('payment', {
            clients: clients,
            role: role,
            options: {}
        });
    });
});

module.exports = router;