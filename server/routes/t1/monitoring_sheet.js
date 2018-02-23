var express = require('express');
var router = express.Router();

var CookieService = require('./../utils/cookies');
var ClientService = require('../../modules/client');
var UserService = require('../../modules/user');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    ClientService.findClientsPacked(function (err, packed) {
        ClientService.findClientsEmailed(function (err, emailed) {
            ClientService.findClientsOSPyt(function (err, pickedUp) {
                ClientService.findAllOtherClients(function (err, normal) {
                    ClientService.findClientsEmailedNotPacked(function(err, emailedNotPacked) {
                        ClientService.findClientsDone(function(err, completed) {
                            ClientService.findClientsNoPreparer(function(err, noPreparer) {
                                ClientService.findClientsGst(function(err, gst) {
                                    UserService.getInitials(function(err, initials) {

                                        var cookie = CookieService.readCookie(req);
                                        var clients = [
                                            ['normal', normal],
                                            ['noPreparer', noPreparer],
                                            ['packed', packed],
                                            ['emailed', emailed],
                                            ['gst', gst],
                                            ['osPyt', pickedUp],
                                            ['emailedNotPacked', emailedNotPacked]
                                        ];

                                        if (cookie.role == 'Administrator') clients.push(['done', completed]);

                                        res.render('t1/monitoring_sheet', {
                                            title: 'T1 Monitoring',
                                            clients: clients,
                                            options: {
                                                pytType: ClientService.getPayments(),
                                                initials: initials,
                                                tax: ClientService.getTax(),
                                                toggle: ['', 'Y'],
                                                status: ClientService.getStatuses()
                                            },
                                            role: cookie.role,
                                        }); 
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});


module.exports = router;