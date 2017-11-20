/**
 * Created by ander on 2017-11-18.
 */
var UserService = require('../modules/user');

var UsersSocket = {
    addUser : function(socket) {
        socket.on('add user', function (data) {
            console.log('add user', data);
            var user = {
                email: data.user[0],
                initials: data.user[1],
                role: data.user[2]
            };
            UserService.createUser(user, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
};

module.exports = UsersSocket;