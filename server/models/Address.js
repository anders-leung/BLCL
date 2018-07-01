var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    apartment: String,
    street: String,
    city: String,
    province: String,
    postalCode: String,
    country: String
});

module.exports = mongoose.model('Address', AddressSchema);