/**
 * Created by ander on 2018-01-13.
 */
const express = require('express');
const router = express.Router();

const CookieService = require('./../utils/cookies');
const ClientService = require('../../modules/t1/client');

const TABLE = require('../../tables/t1/t1135');

router.get('/', CookieService.isLoggedIn, async (req, res) => {
    const query = {
        $or: [
            { 'husband.t1135.value': { $gt: 0 } },
            { 'wife.t1135.value': { $gt: 0 } },
        ]
    };
    const [err, t1135] = await ClientService.get(query);
    if (err) return res.render('error', err);

    const t1 = [];
    const done = [];
    t1135.map((client) => {
        const { husband, wife } = client;
        let doneH = true;
        let doneW = true;
        if (husband && husband.t1135 && husband.t1135.value) {
            if (!husband.t1135.efiled) {
                doneH = false;
            }
        }
        if (wife && wife.t1135 && wife.t1135.value) {
            if (!wife.t1135.efiled) {
                doneW = false;
            }
        }
        if (doneH && doneW) {
            done.push(client);
        } else {
            t1.push(client);
        }
    });

    res.render('t1/t1_efiled', {
        TABLE,
        clients: [
            ['t1', t1],
            ['done', done],
        ],
        role: req.session.role,
        options: {}
    });

    // ClientService.findClientsT1(function(err, t1) {
    //     if (err) return res.render(err);
    //     ClientService.findClientsT1Done(function(err, done) {
    //         if (err) return res.render(err);
    //         res.render('t1/t1_efiled', {
    //             clients: [
    //                 ['t1', t1],
    //                 ['done', done],
    //             ],
    //             role: req.session.role,
    //             options: {}
    //         });
    //     });
    // });
});

module.exports = router;