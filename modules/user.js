/**
 * Created by ander on 2017-09-12.
 */

var User = require('../../models/User');

var UserService = {
    findUser : function(params, callback) {
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
    },

    addClient : function(search, params, callback) {
        User.update(search, { $push: params }, function(err) {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    }
};

module.exports = UserService;