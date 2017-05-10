/**
 * Created by ander on 2017-05-08.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.models = {};
//mongoose.modelSchemas = {};

var TaxableIncomeSchema = new Schema({
    rrsp: [Number],
    _777: Number,
    hbp: Number,
    supportMade: Number,
    moving: Boolean,
    unionDue: Boolean,
    disabilitySupports: Boolean
});

module.exports.TaxableIncome = mongoose.model('TaxableIncome', TaxableIncomeSchema);