/**
 * Created by ander on 2017-12-03.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var CompanyService = require('../modules/company');

router.get('/', CookieService.isLoggedIn, function(req, res) {
    CompanyService.getT2Companies({}, function(err, companies) {
        res.render('t2', { companies: companies, role: req.session.role })
    });
});

module.exports = router;