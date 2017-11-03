/**
 * Created by ander on 2017-11-01.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('../modules/client');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    ClientService.findClientsPytRec(function(err, clients) {
        res.render('payment', { clients: clients })
    });
});

module.exports = router;