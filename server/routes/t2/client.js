const express = require('express');
const router = express.Router();

const CookieService = require('../utils/cookies');
const ClientService = require('../../modules/clients/client');
const T2Service = require('../../modules/t2/client');
const UserService = require('../../modules/user');

router.get('/*', CookieService.isLoggedIn, async (req, res) => {
    let err, t2, initials, clients;
    const { params } = req;
    const { _id } = params;
    const query = { _id };

    if (_id) {
        [err, t2] = await T2Service.find(query);
    }

    [err, initials] = await UserService.getInitials();
    [err, clients] = await ClientService.get({});
    if (err) return res.render('error');
    const statuses = ClientService.getStatus();

    res.render('t2/client', { title: 'T2 Interview',
        statuses,
        t2,
        clients,
        role : CookieService.readCookie(req).role,
        options : {
            initials
        }
    });
});

router.post('/*', async (req, res) => {
    let err, client;
    const { body } = req;
    const query = { client: body.client };

    [err, client] = await T2Service.update(query, req.body);

    if (err) return res.render('error', err);

    res.redirect(`/t2/client/${client._id}`);
});

module.exports = router;
