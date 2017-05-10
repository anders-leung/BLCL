/**
 * Created by ander on 2017-05-07.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.models = {};
mongoose.modelSchemas = {};

var PersonSchema = new Schema({
    citizenship: Boolean,
    election: Boolean,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    departure: String,
    sin: String,
    status: String,
    noa: Boolean,
    totalIncome: Schema.Types.ObjectId,
    taxableIncome: Schema.Types.ObjectId,
    taxCredits: Schema.Types.ObjectId
});

module.exports.Person = mongoose.model('Person', PersonSchema);