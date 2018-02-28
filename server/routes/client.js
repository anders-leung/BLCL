/**
 * Created by ander on 2017-05-09.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('../modules/client');
var UserService = require('../modules/user');

router.get('/', CookieService.isLoggedIn, function(req, res) {
    UserService.getInitials(function(err, initials) {
        res.render('client', { title: 'T1 Interview',
            client : null,
            role : CookieService.readCookie(req).role,
            options : {
                method : ClientService.getMethods(),
                t1135 : ClientService.getT1135(),
                relationship : ClientService.getRelationships(),
                initials: initials
            },
            newClient : true
        });
    });
});

router.get('/:client_name', CookieService.isLoggedIn, function(req, res) {
    var client_name = req.params.client_name;

    var query = {
        'pathName': client_name
    };

    ClientService.findClient(query, function(err, client) {
        UserService.getInitials(function(err, initials) {
            res.render('client', {
                title : 'T1 Interview',
                client : client[0],
                role : CookieService.readCookie(req).role,
                options : {
                    method : ClientService.getMethods(),
                    t1135 : ClientService.getT1135(),
                    relationship : ClientService.getRelationships(),
                    initials: initials
                },
                newClient : false
            });
        });
    });
});

router.post('/', function(req, res) {
    req.body.new = true;
    ClientService.saveClient(req.body, function(err, client) {
        if (err) {
            res.render('error');
        } else {
            res.redirect('/t1');
        }
    });
});

router.post('/:client_name', function(req, res) {
    var client_name = req.params.client_name;
    ClientService.updateClient({ pathName : client_name }, req.body, function(err, client) {
        if (err) {
            res.render('error');
        }
        res.redirect('/t1');
    })
});

module.exports = router;
