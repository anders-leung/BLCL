var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NRSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    pathName: String,
    owner: {
        title: String,
        firstName: String,
        lastName: String,
        dob: String,
        sin: String
    },
    coOwner: {
        title: String,
        firstName: String,
        lastName: String,
        dob: String,
        sin: String
    },
    emails: [ String ],
    phones: [ String ],
    fax: String,
    nr: String,
    services: [{
        service: String,
        signed: String,
        cra: String,
        invoiced: String,
        invoiceNumber: String,
        pytRec: String,
        pytAmount: String
    }],
    startYear: String,
    status: {
        type: String,
        enum: [ 'ACTIVE', 'INACTIVE', 'PENDING' ]
    },
    address: {
        apartment: String,
        street: String,
        city: String,
        province: String,
        postal: String,
        country: String
    },
    agent: {
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    },
    propertyManager: {
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    },
    lawyer: {
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    },
    properties: [{
        apartment: String,
        street: String,
        city: String,
        province: String,
        postal: String
    }],
    purhcaser: {
        type: String,
        enum: [ 'YES', 'NO' ]
    },
    bankInfo: String,
    signed: String,
    pytRec: String,
    pytAmount: String,
    remarks: String,
    rental: {
        contact: String,
        mortgage: {
            contact: String,
            bank: String,
            number: String
        },
        bank: {
            tel: String,
            fax: String,
            contact: String
        }
    },
    cc: {
        usage: String,
        completionDates: [ String ],
        conveyancer: String,
        lawFirm: {
            name: String,
            address: String,
            tel: String,
            fax: String,
            email: String
        }
    },
    year: Number
});

module.exports = mongoose.model('NR', NRSchema);