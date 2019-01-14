const express = require('express');
const router = express.Router();

const CookieService = require('./../utils/cookies');
const T2Service = require('../../modules/t2/client');

router.get('/', CookieService.isLoggedIn, async (req, res) => {
    const query = {
        $or: [ 
            { completed: { $exists: false } },
            { completed: { $eq: null } },
        ],
    };
    const [err, t2s] = await T2Service.get(query);
    if (err) return res.render('error');

    res.render('t2/monitoring', {
        t2s,
        role: req.session.role,
        options: {}
    });
});

module.exports = router;