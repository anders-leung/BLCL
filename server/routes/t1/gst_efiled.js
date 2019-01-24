/**
 * Created by ander on 2018-01-13.
 */
const express = require('express');
const router = express.Router();

const CookieService = require('./../utils/cookies');
const ClientService = require('../../modules/t1/client');

const TABLE = require('../../tables/t1/gst');

router.get('/', CookieService.isLoggedIn, async (req, res) => {
    const query = {
        interviewDate: { $ne : '', $exists: true },
        $or: [
            { 'husband.rental.gstReturn': true },
            { 'husband.selfEmployed.gstReturn': true },
            { 'wife.rental.gstReturn': true },
            { 'wife.selfEmployed.gstReturn': true }
        ]
    };

    const [err, clients] = await ClientService.get(query);
    if (err) return res.render('error', err);

    const gst = [];
    const done = [];
    clients.map((client) => {
        if (client.gstEfiled) {
            done.push(client);
        } else {
            gst.push(client);
        }
    });
    
    res.render('t1/gst_efiled', {
        TABLE,
        clients: [
            ['gst', gst],
            ['done', done]
        ],
        role: req.session.role,
        options: {}
    });

    // ClientService.findClientsGst(function(err, gst) {
    //     if (err) return res.render(err);
    //     ClientService.findClientsGstDone(function(err, done) {
    //         if (err) return res.render(err);
    //         res.render('t1/gst_efiled', {
    //             TABLE,
    //             clients: [
    //                 ['gst', gst],
    //                 ['done', done]
    //             ],
    //             role: req.session.role,
    //             options: {}
    //         });
    //     });
    // });
});

module.exports = router;