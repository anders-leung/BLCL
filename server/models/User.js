/**
 * Created by ander on 2017-09-12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['Administrator', 'Employee']
    },
    initials: String,
    emailPassword: String,
    name: String,
});

module.exports = mongoose.model('User', UserSchema);