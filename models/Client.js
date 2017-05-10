/**
 * Created by ander on 2017-05-07.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.models = {};
//mongoose.modelSchemas = {};

var ClientSchema = new Schema({
    year: Number,
    interviewer: String,
    prSold: Boolean,
    pickupDate: Date,
    preparer: String,
    checker: String,
    interviewDate: Date,
    tel: String,
    cell: String,
    t1135: Number,
    stocks: Boolean,
    t777: Boolean,
    slips: Boolean,
    selfEmployed: Boolean,
    rental: Boolean,
    new: Boolean,
    group: String,
    numberOfReturns: Number,
    method: {
        type: String,
        enum: ['drop', 'email']
    },
    address: String,
    husband: Schema.Types.ObjectId,
    wife: Schema.Types.ObjectId,
    childcare: [Schema.Types.Mixed],
    caregiver: [Schema.Types.Mixed],
    dependentTuition: [Schema.Types.Mixed],
    art: [Schema.Types.Mixed],
    fitness: [Schema.Types.Mixed],
    publicTransit: Boolean,
    donation: Boolean,
    medExp: Boolean,
    hbtc: Number,
    disability: Number,
    t2201: Boolean,
    equiv: Number,
    notes: [String],
    comments: [String],
    wtb: Boolean,
    ctb: Boolean,
    gst: Boolean,
    prov: Boolean,
    msp: Boolean,
    consultFee: Number,
    price: Number
});

module.exports.Client = mongoose.model('Client', ClientSchema);