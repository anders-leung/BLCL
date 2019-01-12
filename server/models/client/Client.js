const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require('../Address');

const ClientSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    incorp: {
        date: Date,
        number: String,
    },
    bnNumber: String,
    pstNumber: String,
    wcbNumber: String,
    yearEnd: Date,
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service',
    }],
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Struck Out', 'Taken Over', 'No YE', 'Dissolved', 'New'],
        default: 'Active'
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
    files: [{
        type: Schema.Types.ObjectId,
        ref: 'Template',
    }],
    newClientDate: Date,
    industry: {
        type: String,
        enum: ['Restaurant', 'Realtor', 'Farm', 'Retail', 'Export', 'Medical', 'Printing', 'Construction'],
    },
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