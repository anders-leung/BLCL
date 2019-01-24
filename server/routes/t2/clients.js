const express = require('express');
const router = express.Router();

const CookieService = require('./../utils/cookies');
const T2Service = require('../../modules/t2/client');

const TABLE = require('../../tables/t2/clients');

router.get('/', CookieService.isLoggedIn, async (req, res) => {
    let err, t2s;
    const query = {
        $or: [ 
            { completed: { $exists: false } },
            { completed: { $eq: null } },
        ],
        'preparer': req.session.initials,
    };

    [err, t2s] = await T2Service.get(query);

    if (err) return res.render('error');

    res.render('t2/monitoring', {
        TABLE,
        t2s,
        role: req.session.role,
        options: {
            toggle: ['', 'Y'],
        }
    });
});

module.exports = router;