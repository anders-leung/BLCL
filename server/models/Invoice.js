const mongoose = require('mongoose');
const Address = require('./Address');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    company: String,
    issueDate: Date,
    issuedBy: String,
    gst: String,
    pst: String,
    total: String,
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
    },
    oneTimeClient: {
        name: String,
        address: Address.schema,
        phone: String,
        fax: String,
        email: String,
    },
    services: [{
        service: {
            type: String,
            enum: ['FS', 'PR', 'T1', 'T2', 'T2054', 'T3', 'T4', 'T5', 'CON', 'CRA', 'MISC', 'NR', 'NR DPT', 'CCRA', 'NON', 'OT1', 'BK', 'SEC', 'DISC', 'OTHER'],
        },
        amount: String,
        details: String,
        total: String,
        gst: String,
        pst: String,
    }],
    pytReceived: {
        type: String,
        enum: [ '', 'ADV', 'CA', 'CHQ', 'DD', 'ET', 'INV' ],
    },
    pytDate: Date,
    number: Number,
});

module.exports = mongoose.model('Invoice', InvoiceSchema);