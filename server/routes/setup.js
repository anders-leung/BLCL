/**
 * Created by ander on 2017-10-27.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ConfigService = require('../modules/config');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    res.render('setup');
});

router.post('/', function(req, res) {
    ConfigService.setT1Directory(req.body.directory, function(err) {
        if (err) res.render('error');

        var readFolder = require('./read_excel');
        readFolder(req.body.directory, function() {
            res.redirect('/');
        });
    });
});

module.exports = router;