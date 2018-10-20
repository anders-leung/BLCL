var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvoiceSchema = new Schema({
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
    clientString: String,
    services: [{
        service: {
            type: String,
            enum: ['FS', 'PR', 'T1', 'T2', 'T3', 'T4', 'T5', 'CON', 'CRA', 'MISC', 'NR', 'NON', 'OT1', 'BK', 'SEC', 'DISC'],
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