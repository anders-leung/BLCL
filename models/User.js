/**
 * Created by ander on 2017-09-12.
 */
/**
 * Created by ander on 2017-05-07.
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
    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }]
});

module.exports = mongoose.model('User', UserSchema);