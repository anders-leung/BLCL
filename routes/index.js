var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('../modules/client');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    ClientService.findClientsPacked(function(err, packed) {
        if (err) {
            res.render('error');
        }
        ClientService.findClientsEmailedNotPaid(function (err, emailed) {
            if (err) {
                res.render('error');
            } else {
                ClientService.findClientsPickedupNotPaid(function(err, pickedUp) {
                    ClientService.findAllOtherClients(function(err, clients) {
                        var cookie = CookieService.readCookie(req);
                        res.render('index', {   title: 'T1 Monitoring',
                                                clients: [
                                                    ['normal', clients],
                                                    ['packed', packed],
                                                    ['emailed', emailed],
                                                    ['pickedUp', pickedUp]
                                                ],
                                                role: cookie.role});
                    })
                });
            }
        });
    });
});


module.exports = router;