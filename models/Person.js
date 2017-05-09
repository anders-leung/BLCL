/**
 * Created by ander on 2017-05-07.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.models = {};
mongoose.modelSchemas = {};

var PersonSchema = new Schema({

});

module.exports.Person = mongoose.model('Person', PersonSchema);