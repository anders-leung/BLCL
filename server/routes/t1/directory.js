/**
 * Created by ander on 2018-01-13.
 */
var express = require('express');
var router = express.Router();
var to = require('../../../helpers/to');

var CookieService = require('./../utils/cookies');
var ClientService = require('../../modules/client');

router.get('/', CookieService.isLoggedIn, async function(req, res) {
    [err, clients] = await to(ClientService.findAllClients());
    res.render('t1/directory', {
        clients: clients,
        role: req.session.role,
        options: {}
    });
});

module.exports = router;