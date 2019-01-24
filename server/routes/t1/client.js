/**
 * Created by ander on 2017-05-09.
 */
var express = require('express');
var router = express.Router();
var to = require('../../helpers/to');

var CookieService = require('../utils/cookies');
var ClientService = require('../../modules/t1/client');
var UserService = require('../../modules/user');

router.get('/', CookieService.isLoggedIn, async function(req, res) {
    [err, initials] = await UserService.getInitials();
    res.render('t1/client', { title: 'T1 Interview',
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

router.get('/:id', CookieService.isLoggedIn, function(req, res) {
    var _id = req.params.id;

    var query = { _id };

    ClientService.findClient(query, async function(err, client) {
        [err, initials] = await UserService.getInitials();
        res.render('t1/client', {
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

router.post('/', function(req, res) {
    req.body.new = true;
    ClientService.saveClient(req.body, function(err, client) {
        if (err) {
            return res.render('error');
        } else {
            res.redirect('/t1/directory');
        }
    });
});

router.post('/:id', function(req, res) {
    var _id = req.params.id;
    ClientService.updateClient({ _id }, req.body, true, function(err, client) {
        if (err) {
            return res.render('error');
        }
        res.redirect('/t1/directory');
    })
});

module.exports = router;
