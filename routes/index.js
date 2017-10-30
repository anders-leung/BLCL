var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('../modules/client');
var ConfigService = require('../modules/config');



/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    ConfigService.getT1Directory(function (err, directory) {
        if (err) res.render('error');
        if (!directory) res.redirect('/setup');
        ClientService.findClientsPacked(function (err, packed) {
            if (err) {
                res.render('error');
            }
            ClientService.findClientsEmailedNotPaid(function (err, emailed) {
                if (err) {
                    res.render('error');
                } else {
                    ClientService.findClientsPickedupNotPaid(function (err, pickedUp) {
                        ClientService.findAllOtherClients(function (err, clients) {
                            var cookie = CookieService.readCookie(req);
                            res.render('index', {
                                title: 'T1 Monitoring',
                                clients: [
                                    ['normal', clients],
                                    ['packed', packed],
                                    ['emailed', emailed],
                                    ['pickedUp', pickedUp]
                                ],
                                pyt: ClientService.getPayments(),
                                role: cookie.role
                            });
                        });
                    });
                }
            });
        });
    });
});


module.exports = router;