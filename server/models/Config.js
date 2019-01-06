/**
 * Created by ander on 2017-10-26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConfigSchema = new Schema({
    invoice_directory: String,
    t1_directory: String,
    invoice_directory: String,
    file_directory: String,
    gst: String,
    pst: String,
});

module.exports = mongoose.model('Config', ConfigSchema);