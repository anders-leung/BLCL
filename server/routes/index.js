/**
 * Created by ander on 2017-12-03.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('../modules/t1/client');
var ConfigService = require('../modules/config');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    ConfigService.getT1Directory(function (err, directory) {
        if (err) res.render('error');
        if (!directory) res.redirect('/setup');
        res.render('index', {
            title: 'Home',
            role: req.session.role,
            options: {}
        });
    });
});


module.exports = router;