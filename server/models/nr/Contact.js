var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    type: String,
    number: String,
    name: String,
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    tel: String,
    fax: String,
    cell: String,
    pager: String,
    email: String,
    nr: {
        type: Schema.Types.ObjectId,
        ref: 'NR'
    },
    contact: {
        company: String,
        person: String
    },
});

module.exports = mongoose.model('Contact', ContactSchema);