/**
 * Created by ander on 2017-09-12.
 */

var User = require('../../models/User');

var UserService = {
    findUser : function(params, callback) {
        User.findOne(params).lean().exec(function(err, client) {
            if (err) {
                callback(err);
            } else {
                callback(err, client);
            }
        });
    }
};

module.exports = UserService;