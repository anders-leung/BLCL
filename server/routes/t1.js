var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('../modules/client');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    ClientService.findClientsPacked(function (err, packed) {
        ClientService.findClientsEmailed(function (err, emailed) {
            ClientService.findClientsOSPyt(function (err, pickedUp) {
                ClientService.findAllOtherClients(function (err, normal) {
                    ClientService.findClientsEmailedNotPacked(function(err, emailedNotPacked) {
                        var cookie = CookieService.readCookie(req);
                        var clients = [
                            ['normal', normal],
                            ['packed', packed],
                            ['emailed', emailed],
                            ['osPyt', pickedUp],
                            ['emailedNotPacked', emailedNotPacked]
                        ];

                        res.render('t1', {
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