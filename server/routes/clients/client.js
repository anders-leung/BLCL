const express = require('express');
const router = express.Router();

const CookieService = require('../utils/cookies');
const ClientService = require('../../modules/clients/client');

router.get('/*', CookieService.isLoggedIn, async function(req, res) {
    let err, client;
    const { params } = req;
    if (params[0]) {
        const query = { _id: params[0] };
    
        [err, clients] = await ClientService.get(query);
        if (clients.length === 1) {
            client = clients[0];
        }
    }

    if (err) return res.render('error');
    
    res.render('clients/client', {
        client,
        role: req.session.role,
        options: {}
    });
});

router.post('/*', CookieService.isLoggedIn, async (req, res) => {
    let query, err, client;
    if (req.params['0']) {
        query = { _id: req.params[0] };
    }

    req.body.services = req.body.services.replace(/\s/g, '').split(',');

    if (query) {
        [err, client] = await ClientService.update(query, req.body);
    } else {
        [err, client] = await ClientService.create(req.body);
    }

    if (err) {
        return res.render(err);
    } else if (!client) {
        err = new Error('Posting client failed to create a user');
        return res.render(err);
    } else {
        res.redirect('/clients/directory');
    }
});

module.exports = router;