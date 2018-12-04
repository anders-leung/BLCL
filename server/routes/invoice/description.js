const express = require('express');
const router = express.Router();

const CookieService = require('../utils/cookies');
const DescriptionService = require('../../modules/invoice/description');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, async (req, res) => {
    const [err, descriptions] = await DescriptionService.getAll({});

    if (err) {
        console.log('descriptions get err: ', err);
        return res.render(err);
    }

    res.render('invoice/description', {
        title: 'Invoice Descriptions',
        options: {},
        role: req.session.role,
        descriptions,
        services: Object.keys(descriptions).sort()
    });
});



module.exports = router;