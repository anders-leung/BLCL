/**
 * Created by ander on 2017-05-08.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.models = {};
//mongoose.modelSchemas = {};

var DependentSchema = new Schema({
    name: String,
    relationship: {
        type: String,
        enum: ['s', 'd', 'f', 'm', 'gf', 'gm']
    },
    dateOfBirth: Date,
    sin: String
});

module.exports.Dependent = mongoose.model('Dependent', DependentSchema);