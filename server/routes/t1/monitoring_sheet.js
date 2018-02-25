var express = require('express');
var router = express.Router();
var async = require('async');

var CookieService = require('./../utils/cookies');
var ClientService = require('../../modules/client');
var UserService = require('../../modules/user');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    var cookie = CookieService.readCookie(req);
    async.series({
        get_normal: function(next) {
            ClientService.findAllOtherClients(function(err, clients) {
                next(err, clients);
            });
        },
        
        get_no_preparer: function(next) {
            ClientService.findClientsNoPreparer(function(err, clients) {
                next(err, clients);
            });
        },
        
        get_packed: function(next) {
            ClientService.findClientsPacked(function(err, clients) {
                next(err, clients);
            });
        },
        
        get_emailed: function(next) {
            ClientService.findClientsEmailed(function(err, clients) {
                next(err, clients);
            });
        },

        get_t1: function(next) {
            ClientService.findClientsT1(function(err, clients) {
                next(err, clients);
            });
        },

        get_gst: function(next) {
            ClientService.findClientsGst(function(err, clients) {
                next(err, clients);
            });
        },

        get_os_pyt: function(next) {
            ClientService.findClientsOSPyt(function(err, clients) {
                next(err, clients);
            });
        },
        
        get_emailed_not_packed: function(next) {
            ClientService.findClientsEmailedNotPacked(function(err, clients) {
                next(err, clients);
            });
        },
        
        get_done: function(next) {
            if (cookie.role != 'Administrator') return next(err, null);
            ClientService.findClientsDone(function(err, clients) {
                next(err, clients);
            });
        },

        get_initials: function(next) {
            UserService.getInitials(function(err, initials) {
                next(err, initials);
            })
        }
    }, function(err, results) {
        var clients = [
            ['normal', results.get_normal],
            ['noPreparer', results.get_no_preparer],
            ['packed', results.get_packed],
            ['emailed', results.get_emailed],
            ['t1', results.get_t1],
            ['gst', results.get_gst],
            ['osPyt', results.get_os_pyt],
            ['emailedNotPacked', results.get_emailed_not_packed]
        ];

        if (cookie.role == 'Administrator') clients.push(['done', results.get_done]);

        res.render('t1/monitoring_sheet', {
            title: 'T1 Monitoring',
            clients: clients,
            options: {
                pytType: ClientService.getPayments(),
                initials: results.get_initials,
                tax: ClientService.getTax(),
                toggle: ['', 'Y'],
                status: ClientService.getStatuses()
            },
            role: cookie.role,
        }); 
    });
});

module.exports = router;