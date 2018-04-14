var express = require('express');
var router = express.Router();
var to = require('../../helpers/to.js');

var CookieService = require('./utils/cookies');
var ClientService = require('../modules/client');
var UserService = require('../modules/user');

var functions = {
    new: async function(user) {
        return await to(ClientService.findClientsWithUserNew(user, true));
    },

    wip: async function(user) {
        return await to(ClientService.findClientsWithUserWIP(user, true));
    },

    ok: async function(user) {
        return await to(ClientService.findClientsWithUserOK(user, true));
    },

    total: async function(user) {
        return await to(ClientService.findAllClients(user));
    },

    done: async function(user) {
        return await to(ClientService.findClientsDone(user));
    },

    packed: async function(user) {
        return await to(ClientService.findClientsPacked(user));
    }
}

async function loadUserStats(initials) {
    let dict = {};
    let error;

    for (let user of initials) {
        dict[user] = {};
        for (let fn in functions) {
            let err, clients;
            [err, clients] = await functions[fn](user);
            if (err) error = err;
            dict[user][fn] = clients;
        }
        if (error) break;
    }

    return [error, dict];
}

router.get('/', CookieService.isLoggedIn, async function(req, res) {
    [err, initials] = await to(UserService.getInitials());
    if (err) res.render('error', err);

    [err, data] = await loadUserStats(initials);
    if (err) res.render('error', err);

    res.render('summary', {
        role: req.session.role,
        data: data,
        options: {}
    });
});

module.exports = router;