const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require('../Address');

const ClientSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    incorp: {
        date: String,
        number: String,
    },
    bnNumber: String,
    pstNumber: String,
    wcbNumber: String,
    yearEnd: Date,
    services: {
        type: [String],
    },
    status: {
        type: String,
    },
    remark: String,
    contact: {
        title: String,
        firstName: String,
        lastName: String,
    },
    phone: String,
    fax: String,
    address: Address.schema,
    email: String,
});

ClientSchema.virtual('contactString').get(function() {
    let string = '';
    if (this.contact) {
        string += (this.contact.title ? this.contact.title + ' ' : '');
        string += (this.contact.firstName ? this.contact.firstName + ' ' : '');
        string += (this.contact.lastName ? this.contact.lastName : '');
    } else {
        string = this.name;
    }
    return string.trim();
});

ClientSchema.set('toObject', { virtuals: true });
ClientSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Client', ClientSchema);