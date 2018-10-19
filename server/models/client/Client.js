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
    yearEnd: String,
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
        LastName: String,
    },
    phone: String,
    fax: String,
    address: Address.schema,
});

ClientSchema.virtual('contactString').get(function() {
    let string = '';
    if (this.contact) {
        string += (this.contact.title ? this.contact.title + ' ' : '');
        string += (this.contact.firstName ? this.contact.firstName + ' ' : '');
        string += (this.contact.lastName ? this.contact.lastName : '');
    }
    return string.trim();
});

module.exports = mongoose.model('Client', ClientSchema);