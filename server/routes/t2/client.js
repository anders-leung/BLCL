const express = require('express');
const router = express.Router();

const CookieService = require('../utils/cookies');
const ClientService = require('../../modules/t2/client');
const UserService = require('../../modules/user');

router.get('/', CookieService.isLoggedIn, async function(req, res) {
    const [err, initials] = await UserService.getInitials();
    if (err) return res.render('error')

    res.render('t2/client', { title: 'T2 Interview',
        client : null,
        role : CookieService.readCookie(req).role,
        options : {
            initials: initials
        },
        newClient : true
    });
});

router.get('/:id', CookieService.isLoggedIn, async (req, res) => {
    const id = req.params.id;
    let err, clients, intiials;
    [err, client] = await ClientService.get({ _id: id });
    [err, initials] = await UserService.getInitials();
    res.render('t2/client', {
        title : 'T2 Interview',
        client : client[0],
        role : CookieService.readCookie(req).role,
        options : {
            initials: initials
        },
        newClient : false
    });
});

router.post('/', function(req, res) {
    req.body.new = true;
    ClientService.create(req.body, function(err, client) {
        if (err) {
            res.render('error');
        } else {
            res.redirect('/t1/directory');
        }
    });
});

router.post('/:client_name', function(req, res) {
    const client_name = req.params.client_name;
    ClientService.updateClient({ pathName : client_name }, req.body, true, function(err, client) {
        if (err) {
            res.render('error');
        }
        res.redirect('/t1/directory');
    })
});

module.exports = router;
