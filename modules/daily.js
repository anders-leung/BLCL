/**
 * Created by ander on 2017-09-24.
 */
var Daily = require('./../models/Daily');

var dateToString = require('./utils/dateToString');

var DailyService = {
    createOrUpdateDaily : function(assignment, callback) {
        var date = dateToString(new Date());
        var query = { date : date };
        var update = { $push : assignment };
        var options = { upsert : true };
        Daily.findOneAndUpdate(query, update, options, function(err) {
            callback(err);
        });
    },

    getDaily : function(date, callback) {
        var query = { date : date };
        Daily.find(query, function(err, daily) {
            callback(err, daily);
        });
    }
};

module.exports = DailyService;