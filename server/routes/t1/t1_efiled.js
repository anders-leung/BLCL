/**
 * Created by ander on 2018-01-13.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./../utils/cookies');
var ClientService = require('../../modules/client');

router.get('/', CookieService.isLoggedIn, function(req, res) {
    ClientService.findClientsT1(function(err, t1) {
        if (err) return res.render(err);
        ClientService.findClientsT1Done(function(err, done) {
            if (err) return res.render(err);
            res.render('t1/t1_efiled', {
                clients: [
                    ['t1', t1],
                    ['done', done],
                ],
                role: req.session.role,
                options: {}
            });
        });
    });
});

module.exports = router;