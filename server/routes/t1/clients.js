/**
 * Created by ander on 2017-09-18.
 */
var express = require('express');
var router = express.Router();
var to = require('../../helpers/to');

var CookieService = require('../utils/cookies');
var ClientService = require('../../modules/t1/client');
var UserService = require('../../modules/user');

router.get('/', CookieService.isLoggedIn, async function(req, res) {
    var query = { 'initials' : req.session.initials };
    var initials = req.session.initials;

    [err, new_clients] = await to(ClientService.findClientsWithUserNew(initials));
    if (err) res.render('error', err);
    
    [err, wip] = await to(ClientService.findClientsWithUserWIP(initials));
    if (err) res.render('error', err);
    
    [err, ok] = await to(ClientService.findClientsWithUserOK(initials));
    if (err) res.render('error', err);
    
    [err, emailed] = await to(ClientService.findClientsWithUserEmailed(initials));
    if (err) res.render('error', err);
    
    [err, done] = await to(ClientService.findClientsPreparerDone(initials));
    if (err) res.render('error', err);
    
    [err, staffInitials] = await to(UserService.getInitials());
    if (err) res.render('error', err);

    var cookie = CookieService.readCookie(req);
    var clients = [
        ['new', new_clients],
        ['wip', wip],
        ['ok', ok],
        ['emailed', emailed],
        ['done', done]
    ];
    res.render('t1/clients', {
        clients: clients,
        initials: initials,
        options: { 
            status: ClientService.getStatuses(),
            initials: staffInitials
        },
        role: cookie.role
    });
});

module.exports = router;