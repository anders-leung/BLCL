/**
 * Created by ander on 2018-01-04.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    variables: [String],
});

module.exports = mongoose.model('Template', TemplateSchema);