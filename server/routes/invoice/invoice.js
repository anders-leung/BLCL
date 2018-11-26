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
        invoice = invoice[0];
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
        descriptions: InvoiceService.getDescriptions(),
    });
});

router.post('/*', CookieService.isLoggedIn, async (req, res) => {
    let query, err, invoice;
    if (req.params['0']) {
        query = { _id: req.params[0] };
    }
    const data = req.body;
    data.issuedBy = req.session.initials
    
    const { client } = data;
    if (!client[0]) {
        client.name = data.clientString;
        client.address.apartment = client[1].address.apartment;
        delete client[0];
        delete client[1];
        data.oneTimeClient = client;
        delete data.client;
    } else {
        data.client = client[0];
    }

    if (query) {
        [err, invoice] = await InvoiceService.update(query, data);
    } else {
        [err, invoice] = await InvoiceService.create(data);
    }

    if (err) return res.render(err);

    const path = await InvoiceService.createPdf(invoice);

    const pdf = fs.readFileSync(path);
    res.contentType('application/pdf');
    res.send(pdf);
});

module.exports = router;