/**
 * Created by ander on 2017-11-18.
 */
var UserService = require('../modules/user');

var UsersSocket = {
    addUser : function(socket) {
        socket.on('add user', function (data) {
            console.log('add user', data);
            var name = data.user[0].split('@')[0];
            var user = {
                email: data.user[0],
                initials: data.user[1],
                role: data.user[2],
                password: name
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