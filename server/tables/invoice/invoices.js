const fn = require('../helper');

// If header is changed, need to update the respective "findTableForRow" function in the front-end monitoring.js

const tableSetup = {
    columns: [
        { header: '#', value: fn('number') },
        { header: 'Client', value: (invoice) => {
            const { client } = invoice;
            if (client) {
                return client.name;
            } else {
                return invoice.oneTimeClient.name;
            }
        } },
        { header: 'Services', value: (invoice) => {
            return invoice.services.map(service => service.service).join(', ');
        } },
        { header: 'Issue Date', value: fn('issueDate') },
        { header: 'Sign Date', value: fn(), field: 'signDate', classes: ['date-edit'] },
        { header: 'PYT Type', value: fn(), field: 'pytReceived', classes: ['select', 'pytType'] },
        // { header: 'Partial Pyt', value: fn('partialPayment'), field: 'partialPyt', classes: ['edit', 'empty'] },
        { header: 'Remarks', value: fn(), field: 'remarks', classes: ['edit'] },
        { header: 'Preparer', value: fn('issuedBy') },
        { header: 'Amount Owing', value: fn('total') },
    ]
};

module.exports = tableSetup;