var express = require('express');
var router = express.Router();
var to = require('../../helpers/to');

var CookieService = require('../utils/cookies');
var ClientService = require('../../modules/nr/client');

router.get('/', CookieService.isLoggedIn, async function(req, res) {
    let err, clients;
    [err, clients] = await ClientService.find({});
    res.render('nr/directory', {
        clients: clients,
        role: req.session.role,
        options: {}
    });
});

module.exports = router;