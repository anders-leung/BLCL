/**
 * Created by ander on 2017-05-08.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.models = {};
//mongoose.modelSchemas = {};

var TaxCreditsSchema = new Schema({
    installation: Number,
    tuition: Boolean,
    studentLoan: Boolean,
});

module.exports.TaxCredits = mongoose.model('TaxCredits', TaxCreditsSchema);