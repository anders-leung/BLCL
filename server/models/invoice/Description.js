const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DescriptionSchema = new Schema({
    service: {
        type: String,
        unique: true,
    },
    description: String,
});

module.exports = mongoose.model('Description', DescriptionSchema);