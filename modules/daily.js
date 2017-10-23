/**
 * Created by ander on 2017-09-24.
 */
var Daily = require('./../models/Daily');

var dateToString = require('./utils/dateToString');

var DailyService = {
    createOrUpdateDaily : function(assignment, callback) {
        var date = dateToString(new Date());
        var query = { date : date };
        Daily.findOne(query, function(err, daily) {
            if (err) {
                callback(err);
            } else if (daily) {
                daily.assignments.push(assignment);
            } else {
                daily = new Daily();
                daily.date = date;
                daily.assignments = [assignment];
            }
            daily.save(function(err) {
                callback(err);
            });
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