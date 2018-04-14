var express = require('express');
var router = express.Router();
var async = require('async');
var to = require('../../../helpers/to');

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
        
        get_packed: async function() {
            let err, clients;
            [err, clients] = await to(ClientService.findClientsPacked());
            if (err) return err;
            return clients;
        },
        
        get_emailed: function(next) {
            ClientService.findClientsEmailed(function(err, clients) {
                next(err, clients);
            });
        },

        get_os_signed: function(next) {
            ClientService.findClientsOSSigned(function(err, clients) {
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
        
        get_done: async function() {
            let err, clients;
            [err, clients] = await to(ClientService.findClientsDone());
            if (err) return err;
            return clients;
        },

        get_all: function(next) {
            ClientService.findAllInterviewedClients(function(err, clients) {
                next(err, clients);
            });
        },

        get_initials: async function() {
            let err, clients;
            [err, clients] = await to(UserService.getInitials());
            if (err) return err;
            return clients;
        }

    }, function(err, results) {
        if (err) console.log(err);

        var missing = results.get_all.slice(0);
        var clients = [
            ['normal', results.get_normal],
            ['noPreparer', results.get_no_preparer],
            ['packed', results.get_packed],
            ['emailed', results.get_emailed],
            ['osSigned', results.get_os_signed],
            ['osPyt', results.get_os_pyt],
            ['emailedNotPacked', results.get_emailed_not_packed],
            ['done', results.get_done]
        ];

        for (var i = 0; i < clients.length; i++) {
            for (var k = 0; k < clients[i][1].length; k++) {
                for (var j = 0; j < missing.length; j++) {
                    if (clients[i][1][k].fileName == missing[j].fileName) {
                        missing.splice(j, 1);
                    }
                }
            }
        }

        clients.pop();
        clients.push(['missing', missing]);
        if (cookie.role == 'Administrator') {
            clients.push(['done', results.get_done]);
            clients.push(['all', results.get_all]);
        }

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