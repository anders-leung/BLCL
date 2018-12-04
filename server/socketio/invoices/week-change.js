const InvoiceService = require('../../modules/invoice/invoice');

module.exports = async (socket, search) => {
    const { field, week, company } = search;
    const query = { company };
    if (field === 'pytDate') {
        query.pytReceived = {
            $ne: '',
            $exists: true,
        };
    } else {
        query.$or = [
            { pytReceived: '' },
            { pytReceived: { $exists: false } },
        ];
    }

    let err, invoices;
    if (week) [err, invoices] = await InvoiceService.getByWeek(query, field, week);
    else [err, invoices] = await InvoiceService.get(query);

    if (err) return console.log('week change socket update err: ', err);
    
    let data;
    switch(field) {
        case 'pytDate':
            data = getPaymentData(invoices);
        case 'issueDate':
            data = getSalesData(invoices);
    }
    socket.emit('update payments data', data);
};


function getPaymentData(invoices) {                             
    return invoices.map((invoice) => {
        let client = invoice.client;
        if (!client) client = invoice.oneTimeClient;
        return [
            invoice.number,
            client.name,
            (invoice.pytReceived == 'ADV' ? invoice.total : ''),
            (invoice.pytReceived == 'INV' ? invoice.total : ''),
            (invoice.pytReceived == 'CA' ? invoice.total : ''),
            (invoice.pytReceived == 'CHQ' ? invoice.total : ''),
            (invoice.pytReceived == 'DD' ? invoice.total : ''),
            (invoice.pytReceived == 'ET' ? invoice.total : ''),
            '',
        ];
    });
}

function getSalesData(invoices) {
    const services = InvoiceService.getServices();
    return invoices.map((invoice) => {
        let client = invoice.client;
        if (!client) client = invoice.oneTimeClient;
        const data = [
            invoice.number,
            client.name,
        ]
        let total = 0;
        let gst = 0;
        for (const service of services) {
            const matches = invoice.services.filter(x => x.service === service);
            if (matches.length > 0) {
                let amount = 0;
                matches.map((match) => {
                    amount += parseFloat(match.amount);
                    gst += parseFloat(match.gst);
                });
                data.push(parseFloat(amount).toFixed(2));
                total += amount;
            } else {
                data.push('');
            }
        }
        data.push(gst.toFixed(2));
        data.push((gst + total).toFixed(2));
        return data;
    });
}