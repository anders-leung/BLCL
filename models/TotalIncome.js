/**
 * Created by ander on 2017-05-08.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.models = {};
//mongoose.modelSchemas = {};

var TotalIncomeSchema = new Schema({
    t4: Number,
    t5Cad: [Number],
    otherIncome: [Number],
    t5Other: [Number],
    foreignIncome: [Schema.Types.Mixed],
    t3: [Number],
    t5007: Number,
    t4A: Number,
    t5008: [Number],
    t4AOAS: Number,
    rental: [Schema.Types.Mixed],
    t4E: Number,
    selfEmployed: [Schema.Types.Mixed],
    t4RSP: Number,
    supportReceived: Number,
    uccb: Boolean
});

module.exports.TotalIncome = mongoose.model('TotalIncome', TotalIncomeSchema);