/**
 * Created by ander on 2018-01-13.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./../utils/cookies');
var ClientService = require('../../modules/client');

router.get('/', CookieService.isLoggedIn, function(req, res) {
    ClientService.findClientsGst(function(err, gst) {
        if (err) return res.render(err);
        ClientService.findClientsGstDone(function(err, done) {
            if (err) return res.render(err);
            res.render('t1/gst_efiled', {
                clients: [
                    ['gst', gst],
                    ['done', done]
                ],
                role: req.session.role,
                options: {}
            });
        });
    });
});

module.exports = router;