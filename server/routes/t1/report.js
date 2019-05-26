const express = require('express');
const async = require('async');
const router = express.Router();

const CookieService = require('../utils/cookies');
const ClientService = require('../../modules/t1/client');
const UserService = require('../../modules/user');

/* GET users listing. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    if (CookieService.readCookie(req).role != 'Administrator') {
        res.redirect('/');
    }
    UserService.getAllUsers(function(err, users) {
        const dict = {};
        async.each(users, function(user, callback) {
            ClientService.findClientsWithUser(user.initials, { done: true }, function(err, clients) {
                if (err) {
                    callback(err);
                } else {
                    if (clients.length === 0) {
                        return callback();
                    }
                    dict[user.initials] = clients;
                    callback();
                }
            });
        }, function() {
            const entries = [];
            Object.keys(dict).sort().forEach(function(key) {
                const counts = {
                    confirmPickupDate: 0,
                    new: 0,
                    pickupDate: 0,
                    pytAmount: 0,
                    rental: 0,
                    selfEmployed: 0,
                    slips: 0,
                    stocks: 0,
                    t1135: [0, 0, 0],
                    t777: 0,
                };
                const entry = [key];
                const clients = dict[key];
                clients.forEach((client) => {
                    Object.keys(counts).forEach((field) => {
                        if (field === 't1135') {
                            const type = client[field];
                            let index = 0;
                            if (type === 'SIMPLE') index = 1;
                            if (type === 'COMPLICATED') index = 2;
                            counts[field][index] += 1;
                        } else if (field === 'pytAmount') {
                            counts[field] += Number(client[field]);
                        } else {
                            if (client[field]) {
                                counts[field] += 1;
                            }
                        }
                    });
                });
                Object.keys(counts).sort().forEach((key) => {
                    let value = counts[key];
                    if (key === 't1135') {
                        return entry.push(...value);
                    } else if (key === 'pytAmount') {
                        value = value.toFixed(2);
                    }
                    entry.push(value);
                });
                entries.push(entry);
            });

            res.render('t1/report', {
                role: req.session.role,
                entries,
                options : {}
            });
        });
    });
});

module.exports = router;
