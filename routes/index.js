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
            ClientService.findClientsEmailed(function (err, emailed) {
                ClientService.findClientsOSPyt(function (err, pickedUp) {
                    ClientService.findAllOtherClients(function (err, normal) {
                        var cookie = CookieService.readCookie(req);
                        var clients = [
                            ['normal', normal],
                            ['packed', packed],
                            ['emailed', emailed],
                            ['osPyt', pickedUp]
                        ];

                        res.render('index', {
                            title: 'T1 Monitoring',
                            clients: clients,
                            options: ClientService.getPayments(),
                            role: cookie.role
                        });
                    });
                });
            });
        });
    });
});


module.exports = router;