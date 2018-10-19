let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Address = require('../Address');

let ContactSchema = new Schema({
    number: String,
    name: String,
    address: Address.schema,
    tel: String,
    fax: String,
    cell: String,
    pager: String,
    email: String,
    contact: {
        company: String,
        person: String
    },
});

module.exports = mongoose.model('Contact', ContactSchema);