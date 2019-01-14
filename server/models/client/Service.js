const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
});

module.exports = mongoose.model('Service', ServiceSchema);