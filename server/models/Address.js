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

AddressSchema.virtual('fullAddress').get(function() {
    let string = '';
    if (this.apartment) string += this.apartment + ' ';
    if (this.street) string += this.street + ', ';
    if (this.city) string += this.city + ', ';
    if (this.province) string += this.province + ' ';
    if (this.postalCode) string += this.postalCode + ', ';
    if (this.country) string += this.country;

    string = string.trim();
    string = string.replace(/[^A-z]$/, '');

    return string;
});

module.exports = mongoose.model('Address', AddressSchema);