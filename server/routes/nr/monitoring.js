var express = require('express');
var router = express.Router();
var to = require('../../helpers/to');

var CookieService = require('../utils/cookies');
var ClientService = require('../../modules/nr/client');

router.get('/*', CookieService.isLoggedIn, async function(req, res) {
    let year = req.params.year;
    if (!year) year = 2018;
    
    let err, nr4, nr6, s216, cc, years;
    [err, all] = await ClientService.find({ year: year});
    all = all.map(function(client) {
        let services = [];
        if (client.nr6) services.push('NR6');
        if (client.nr4) services.push('NR4');
        if (client.s216) services.push('S216');
        if (client.cc) services.push('CC');
        if (client.s116) services.push('S116');
        client.services = services.join(', ');
        return client;
    });

    [err, nr6] = await ClientService.find({ year: year, nr6: { $exists: true } });
    [err, nr4] = await ClientService.find({ year: year, nr4: { $exists: true } });
    [err, s216] = await ClientService.find({ year: year, s216: { $exists: true } });
    [err, cc] = await ClientService.find({ year: year, cc: { $exists: true } });
    [err, s116] = await ClientService.find({ year: year, s116: { $exists: true } });
    [err, years] = await ClientService.getYears();

    let clients = [
        ['all', all],
        ['nr6', nr6],
        ['nr4', nr4],
        ['s216', s216],
        ['cc', cc],
        ['s116', s116]
    ];
    res.render('nr/monitoring', {
        clients: clients,
        role: req.session.role,
        user: req.session.initials,
        years: years,
        year: year,
        options: {}
    });
});

module.exports = router;