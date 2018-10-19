const express = require('express');
const router = express.Router();
const to = require('../../helpers/to');

const CookieService = require('../utils/cookies');
const ClientService = require('../../modules/clients/client');

router.get('/', CookieService.isLoggedIn, async function(req, res) {
    const [err, clients] = await ClientService.get({});

    if (err) return res.render('error');
    
    res.render('clients/directory', {
        clients: clients,
        role: req.session.role,
        options: {}
    });
});

module.exports = router;