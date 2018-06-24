var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NR6 = require('./Services').NR6;
var NR4 = require('./Services').NR4;
var S216 = require('./Services').S216;
var CC = require('./Services').CC;
var S116 = require('./Services').S116;
var Address = require('../Address');
var Contact = require('./Contact');

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
    startYear: String,
    status: {
        type: String,
        enum: [ 'ACTIVE', 'INACTIVE' ]
    },
    address: Address.schema,
    agent: Contact.schema,
    propertyManager: Contact.schema,
    lawyer: Contact.schema,
    properties: [ Address.schema ],
    purchaser: {
        type: String,
        enum: [ 'YES', 'NO' ]
    },
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
    nr6: NR6.schema,
    nr4: NR4.schema,
    s216: S216.schema,
    cc: CC.schema,
    s116: S116.schema,
    year: Number,
    closed: Boolean
});

module.exports = mongoose.model('NR', NRSchema);