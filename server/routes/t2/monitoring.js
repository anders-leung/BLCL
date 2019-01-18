const express = require('express');
const router = express.Router();

const CookieService = require('./../utils/cookies');
const T2Service = require('../../modules/t2/client');
const UserService = require('../../modules/user');

const TABLE = require('../../tables/t2/monitoring');

router.get('/', CookieService.isLoggedIn, async (req, res) => {
    let err, t2s, initials;
    const query = {
        $or: [ 
            { completed: { $exists: false } },
            { completed: { $eq: null } },
        ],
    };

    [err, t2s] = await T2Service.get(query);
    [err, initials] = await UserService.getInitials();

    if (err) return res.render('error');

    res.render('t2/monitoring', {
        TABLE,
        t2s,
        role: req.session.role,
        options: {
            initials,
        }
    });
});

module.exports = router;