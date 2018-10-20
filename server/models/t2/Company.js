var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Address = require('../Address');

var CompanySchema = new Schema({
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
    // commonShares: String,
    // director: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Client',
    // },
    // chairman: String,
    // secretary: String,
    // address: Address.schema,
    // structure: String,
    // shareholders: [{
    //     name: String,
    //     percent: String,
    // }],
});

CompanySchema.virtual('contactString').get(function() {
    let string = '';
    if (this.contact) {
        string += (this.contact.title ? this.contact.title + ' ' : '');
        string += (this.contact.firstName ? this.contact.firstName + ' ' : '');
        string += (this.contact.lastName ? this.contact.lastName : '');
    }
    return string.trim();
});

module.exports = mongoose.model('T2', CompanySchema);