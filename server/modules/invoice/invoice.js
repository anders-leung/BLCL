const to = require('../../helpers/to');
const Invoice = require('../../models/invoice');
const pdf = require('./invoice-pdf');

const InvoiceService = {
    create: async (invoice) => {
        const [err, number] = await latestInvoiceNumber(invoice.company);

        if (err) return [err, null];

        for (let i = 0; i < invoice.services.length; i++) {
            const service = invoice.services[i];
            service.total = convert(parseFloat(service.amount) + parseFloat(service.gst));
        }

        const [e, newInvoice] = await to(new Invoice(Object.assign({
            number,
            issueDate: new Date(),
        }, invoice)).save());

        return await pdf(newInvoice);
    },

    update: async (query, data) => {
        return await to(Invoice.findOneAndUpdate(query, data));
    },

    get: async (query) => {
        return await to(Invoice.find(query).populate('client'));
    },

    getByWeek: async (query, field, week) => {
        const weekRange = week.split(' - ');
        const weekStart = new Date(weekRange[0]);
        const weekEnd = new Date(weekRange[1]);
        
        Object.assign(query, {
            [field]: {
                $gte: weekStart,
                $lt: weekEnd,
            },
        });

        return await to(Invoice.find(query).populate('client'));
    },

    getOs: async (service) => {
        return await to(Invoice.aggregate([
                { $match: { $or: [{ pytReceived: '' }, { pytReceived: { $exists: false } }] } },
                { $unwind: '$services' },
                { $match: { 'services.service': service } },
                { $lookup: {
                    from: 't2',
                    localField: 'client',
                    foreignField: '_id',
                    as: 'client'
                }},
                { $project: {
                    number: true,
                    company: true,
                    issueDate: true,
                    pytReceived: true,
                    'client.name': true,
                    'services.total': true,
                    'services.service': true
                }}
            ]));
    },

    getServices: () => {
        return Invoice.schema.path('services').schema.path('service').enumValues;
    },

    createPdf: async (invoice) => {
        pdf(invoice);
    }
};

async function latestInvoiceNumber(company) {
    const [err, invoice] = await to(Invoice.findOne({ company }).sort('-number').select('number').lean());
    if (err) return [err, null];
    if (!invoice) return [null, 1];
    else return [null, invoice.number + 1];
}

function convert(value) {
    const tokens = value.toString().split('.');
    if (tokens.length === 1) return value + '.00';
    const integer = tokens[0];
    var decimal = tokens[1];
    if (decimal.length > 2) {
        if (decimal[2] > 4) {
            decimal = decimal.substring(0, 1) + (Number(decimal[1]) + 1);
        }
    } else {
        decimal = decimal + '0';
    }
    return integer + '.' + decimal.substring(0, 2);
}

module.exports = InvoiceService;