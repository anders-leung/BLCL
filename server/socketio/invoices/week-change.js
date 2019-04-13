const InvoiceService = require('../../modules/invoice/invoice');
const DescriptionService = require('../../modules/invoice/description');

module.exports = async (socket, search) => {
    const { field, week, company } = search;
    const query = { company };
    if (field === 'pytDate') {
        query.pytReceived = {
            $ne: '',
            $exists: true,
        };
    }

    if (!field && !week) {
        query.$or = [
            { pytReceived: { $exists: false } },
            { pytReceived: '' }
        ]
    }

    let err, invoices;
    if (week) [err, invoices] = await InvoiceService.getByWeek(query, field, week);
    else [err, invoices] = await InvoiceService.get(query);

    if (err) return console.log('week change socket update err: ', err);
    
    let data;
    switch(field) {
        case 'pytDate':
            data = getPaymentData(invoices);
            break;
        default:
            data = await getSalesData(invoices);
            break;
    }
    socket.emit('update payments data', data);
};


function getPaymentData(invoices) {                             
    return invoices.map((invoice) => {
        let client = invoice.client;
        if (!client) client = invoice.oneTimeClient;
        var r = [
            invoice._id,
            invoice.pytDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
            invoice.number,
            client.name,
            (invoice.remarks || ''),
            invoice.total,
            (invoice.pytReceived == 'ADV' ? invoice.total : ''),
            (invoice.pytReceived == 'INV' ? invoice.total : ''),
            (invoice.pytReceived == 'CA' ? invoice.total : ''),
            (invoice.pytReceived == 'CHQ' || invoice.pytReceived == 'CK' ? invoice.total : ''),
            (invoice.pytReceived == 'DD' ? invoice.total : ''),
            (invoice.pytReceived == 'ET' ? invoice.total : ''),
        ];
        return r;
    });
}

async function getSalesData(invoices) {
    const [err, services] = await DescriptionService.getServices();
    return invoices.map((invoice) => {
        let client = invoice.client;
        if (!client) client = invoice.oneTimeClient;
        const data = [
            invoice._id,
            invoice.issueDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
            invoice.number,
            client.name,
        ]
        let gst = 0;
        let pst = 0;
        for (const service of services) {
            const matches = invoice.services.filter(x => x.service === service);
            if (matches.length > 0) {
                let amount = 0;
                matches.map((match) => {
                    amount += parseFloat(match.amount);
                    gst += parseFloat(match.gst);
                    if (match.pst) {
                        pst += parseFloat(match.pst);
                    }
                });
                data.push(parseFloat(amount).toFixed(2));
            } else {
                data.push('');
            }
        }
        data.push(gst.toFixed(2));
        data.push(pst.toFixed(2));
        data.splice(4, 0, invoice.total);
        return data;
    });
}