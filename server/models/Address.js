var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    apartment: String,
    street: String,
    city: String,
    province: String,
    postal: String,
    country: String
});

module.exports = mongoose.model('Address', AddressSchema);