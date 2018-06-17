var express = require('express');
var router = express.Router();
var to = require('../../helpers/to');

var CookieService = require('../utils/cookies');
var ClientService = require('../../modules/nr/client');

router.get('/', CookieService.isLoggedIn, async function(req, res) {
    let err, osSigned, osPyt;
    [err, osSigned] = await ClientService.findOsSigned();
    [err, osPyt] = await ClientService.findOsPyt();
    let clients = [
        ['osSigned', osSigned],
        ['osPyt', osPyt]
    ];
    res.render('nr/monitoring', {
        clients: clients,
        role: req.session.role,
        user: req.session.initials,
        options: {}
    });
});

module.exports = router;