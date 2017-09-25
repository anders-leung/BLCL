/**
 * Created by ander on 2017-09-12.
 */

var User = require('../models/User');

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
            if (err) {
                callback(err);
            } else {
                callback(err, user);
            }
        });
    },

    getAllUsers : function(callback) {
        User.find({}).lean().exec(function(err, users) {
            if (err) {
                callback(err);
            }
            else {
                callback(err, users);
            }
        });
    }
};

module.exports = UserService;