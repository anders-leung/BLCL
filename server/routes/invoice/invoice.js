const express = require('express');
const router = express.Router();

const fs = require('fs');

const CookieService = require('../utils/cookies');
const InvoiceService = require('../../modules/invoice/invoice');
const ClientService = require('../../modules/clients/client');
const ConfigService = require('../../modules/config');

/* GET home page. */
router.get('/*', CookieService.isLoggedIn, async (req, res) => {
    let err, invoice;
    if (req.params['0']) {
        [err, invoice] = await InvoiceService.get({ _id: req.params[0] });
    }

    const [clientErr, clients] = await ClientService.get({});
    if (clientErr) return res.render('error');
    
    const [configErr, tax] = await ConfigService.getTax();
    const services = InvoiceService.getServices();
    if (configErr) return res.render('error');

    res.render('invoice/invoice', {
        title: 'Invoice',
        role: req.session.role,
        gst: tax.gst,
        pst: tax.pst,
        invoice,
        clients,
        services,
    });
});

router.post('/', CookieService.isLoggedIn, async (req, res) => {
    const data = req.body;
    data.issuedBy = req.session.initials
    const path = await InvoiceService.create(data);
    const invoice = fs.readFileSync(path);
    res.contentType('application/pdf');
    res.send(invoice);
});

module.exports = router;