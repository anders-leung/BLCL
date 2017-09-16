var express = require('express');
var router = express.Router();
var ClientService = require('../routes/api/client');
var UserService = require('../routes/api/user');
var CookieService = require('./utils/cookies');

/* GET home page. */
router.get('/', function(req, res, next) {
    var cookie = CookieService.readCookie(req);
    if (cookie) {
        ClientService.findClient({}, function (err, clients) {
            if (err) {
                res.render('error');
            }
            res.render('index', {title: 'T1 Monitoring', clients: clients, role: cookie.role});
        });
    } else {
        res.render('login', { title: 'BLCL' });
    }
});

router.post('/', function(req, res) {
    if (CookieService.readCookie(req)) {
        var data = req.body.checks.split(',');
        var pathName = data[0];
        var attr = data[1];
        var value = data[2];
        var scrollLeft = data[3];
        var scrollTop = data[4];
        scroll = scrollLeft + ',' + scrollTop;
        var update = {};
        update[attr] = value;
        ClientService.updateClient({pathName: pathName}, update, function (err) {
            if (err) {
                res.render('error');
            }
        });

        res.redirect('/');
    } else {
        var email = req.body.email;
        var password = req.body.password;
        UserService.findUser({ email: email, password: password }, function(err, user) {
            if (err) {
                res.render('error');
            }
            if (user) {
                CookieService.createCookie(req, user.email, user.role);
            }
            res.redirect('/');
        })
    }
});

module.exports = router;
