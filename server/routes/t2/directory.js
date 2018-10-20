const express = require('express');
const router = express.Router();

const CookieService = require('./../utils/cookies');
const ClientService = require('../../modules/t2/client');

router.get('/', CookieService.isLoggedIn, async (req, res) => {
    const [err, clients] = await ClientService.get({});
    if (err) return res.render('error');

    res.render('t2/directory', {
        clients: clients,
        role: req.session.role,
        options: {}
    });
});

module.exports = router;