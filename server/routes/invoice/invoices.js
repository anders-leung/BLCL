var express = require('express');
var router = express.Router();

var CookieService = require('../utils/cookies');
var InvoiceService = require('../../modules/invoice/invoice');
var ClientService = require('../../modules/t1/client');

const TABLE = require('../../tables/invoice/invoices');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, async (req, res) => {
    const [doneErr, done] = await InvoiceService.get({ $and: [{ pytReceived: { $ne: '' } }, { pytReceived: { $exists: true } }] });
    const [err, os] = await InvoiceService.get({ $or: [{ pytReceived: '' }, { pytReceived: { $exists: false } }] });
    const invoices = [
        ['os', os],
        // ['done', done],
        // ['all', all],
    ]

    // const services = InvoiceService.getServices();
    // let err, invoice;
    // for (service of services) {
    //     [err, invoice] = await InvoiceService.getOs(service);
    //     invoices.unshift([service.toLowerCase(), invoice]);
    // }

    res.render('invoice/invoices', {
        TABLE,
        title: 'Invoice',
        role: req.session.role,
        invoices: os,
        options: {
            pytType: ClientService.getPayments(),
        },
    });
});

module.exports = router;