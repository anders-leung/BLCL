/**
 * Created by ander on 2017-10-26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConfigSchema = new Schema({
    t1_directory: String
});

module.exports = mongoose.model('Config', ConfigSchema);