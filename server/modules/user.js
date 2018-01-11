/**
 * Created by ander on 2017-09-12.
 */

var User = require('../models/user');

var UserService = {
    createUser : function(params, callback) {
        var user = new User(params);
        user.save(function(err) {
            if (err) {
                callback(err);
            }
        });
    },

    findOneUser : function(params, callback) {
        User.findOne(params).lean().exec(function(err, user) {
            callback(err, user);
        });
    },

    getAllUsers : function(callback) {
        User.find({}).sort('initials').lean().exec(function(err, users) {
            if (err) {
                callback(err);
            }
            else {
                callback(err, users);
            }
        });
    },

    getRoles : function() {
        return User.schema.path('role').enumValues;
    }
};

module.exports = UserService;