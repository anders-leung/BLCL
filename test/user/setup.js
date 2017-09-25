/**
 * Created by ander on 2017-09-22.
 */
var User = require('../../models/User');

function createUser(callback) {
    var user = new User();
    user.email = 'test-email@gmail.com';
    user.password = 'test';
    user.role = 'Employee';
    user.initials = 'TE';
    user.save(function(err) {
        if (err) {
            callback(err);
        } else {
            callback();
        }
    });
};

var UserSetup = {
    before : function(callback) {
        User.remove({}, function(err) {
            if (err) {
                callback(err);
            } else {
                createUser(callback);
            }
        })
    },

    after : function(callback) {
        User.remove({}, function(err) {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        })
    }
};

module.exports = UserSetup;