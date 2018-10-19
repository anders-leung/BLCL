const express = require('express');
const router = express.Router();

const getWeeks = require('./get_weeks');
const CookieService = require('../utils/cookies');
const InvoiceService = require('../../modules/invoice/invoice');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, async (req, res) => {
    const role = CookieService.readCookie(req).role;
    if (role != 'Administrator') {
        return res.redirect('/');
    }

    const weeks = getWeeks();
    const query = {
        pytReceived: {
            $ne: '',
            $exists: true,
        },
    };

    const [err, invoices] = await InvoiceService.getByWeek(query, 'pytDate', weeks[0]);

    if (err) return res.render('error', err);

    res.render('invoice/payment', {
        invoices,
        weeks,
        role: req.session.role,
        options: {},
    });
});

module.exports = router;