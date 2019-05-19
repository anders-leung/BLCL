const mongoose = require('mongoose');
const Address = require('../Address');
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
        service: String,
        amount: String,
        details: String,
        total: String,
        gst: String,
        pst: String,
    }],
    partialPyt: Number,
    pytReceived: {
        type: String,
        enum: [ '', 'ADV', 'CA', 'CHQ', 'DD', 'ET', 'INV' ],
    },
    pytDate: Date,
    number: Number,
    remarks: String,
    signDate: Date,
    emailed: {
        when: Date,
        attempt: Number,
    },
});

InvoiceSchema.virtual('owing').get(function() {
    let owing = this.total;
    if (this.partialPyt) {
        owing -= this.partialPyt;
        owing = owing.toFixed(2);
    }
    return owing;
});

InvoiceSchema.virtual('partialPayment').get(function() {
    const { partialPyt } = this;
    return partialPyt ? partialPyt.toFixed(2) : '';
});

module.exports = mongoose.model('Invoice', InvoiceSchema);