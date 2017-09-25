var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('../modules/client');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    ClientService.findClient({}, function (err, clients) {
        if (err) {
            res.render('error');
        }
        var cookie = CookieService.readCookie(req);
        res.render('index', {title: 'T1 Monitoring', clients: clients, role: cookie.role});
    });
});


module.exports = router;
