/**
 * Created by ander on 2017-09-22.
 */
var Assignment = require('../models/Assignment');

var dateToString = require('utils/dateToString');

var AssignmentService = {
    findAssignmentByUser: function(user, callback) {
        Assignment.find({ user : user._id }, function(err, assignments) {
            callback(err, assignments);
        });
    },

    createAssignment: function(user, client, callback) {
        var assignment = new Assignment();
        assignment.user = user._id;
        assignment.client = client._id;
        assignment.save(function(err) {
            callback(err);
        });
    },

    createOrUpdateAssignment: function(user, client, callback) {
        var date = dateToString(new Date());
        var query = { client : client._id };
        var update = {
            date: date,
            user: user
        };
        var options = { upsert : true };
        Assignment.findOneAndUpdate(query, update, options, function(err) {
            callback(err);
        });
    }
};

module.exports = AssignmentService;