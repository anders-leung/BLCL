/**
 * Created by ander on 2017-09-21.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssignmentSchema = new Schema({
    date: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        unique: true
    },
    wip: String,
    done: String
});

module.exports = mongoose.model('Assignment', AssignmentSchema);