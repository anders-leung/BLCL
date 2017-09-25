/**
 * Created by ander on 2017-09-24.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DailySchema = new Schema({
    date: String,
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment',
        unique: true
    }]
});

module.exports = mongoose.model('Daily', DailySchema);