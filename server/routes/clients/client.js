const express = require('express');
const router = express.Router();

const CookieService = require('../utils/cookies');
const ClientService = require('../../modules/clients/client');
const ServiceService = require('../../modules/clients/service');
const InvoiceService = require('../../modules/invoice/invoice');
const TemplateService = require('../../modules/template/template');

router.get('/*', CookieService.isLoggedIn, async function(req, res) {
    let err, client, invoices;
    const { params } = req;
    if (params[0]) {
        let query = { _id: params[0] };
    
        [err, clients] = await ClientService.get(query);
        if (clients.length === 1) {
            client = clients[0];
        }

        if (err) return res.render('error', err);

        query = { client: client._id };
        [err, invoices] = await InvoiceService.get(query);        
    }

    if (err) return res.render('error', err);

    [err, services] = await ServiceService.get({});
    [err, files] = await TemplateService.get({});

    const statuses = ClientService.getStatus();
    
    res.render('clients/client', {
        statuses,
        files,
        client,
        services,
        invoices,
        role: req.session.role,
        options: {}
    });
});

router.post('/*', CookieService.isLoggedIn, async (req, res) => {
    let query, err, client;
    if (req.params['0']) {
        query = { _id: req.params[0] };
    }

    if (!req.body.files) {
        req.body.files = [];
    }

    if (query) {
        [err, client] = await ClientService.update(query, req.body);
    } else {
        [err, client] = await ClientService.create(req.body);
    }

    [err, result] = await ClientService.updateFiles(client._id);

    if (err) {
        return res.render(err);
    } else if (!client) {
        err = new Error('Posting client failed to create a user');
        return res.render(err);
    } else {
        res.redirect(`/clients/client/${client._id}`);
    }
});

module.exports = router;