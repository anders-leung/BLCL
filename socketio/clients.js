/**
 * Created by ander on 2017-09-18.
 */
var ClientService = require('../modules/client');
var UserService = require('../modules/user');
var AssignmentService = require('../modules/assignment');

var ClientsSockets = {
    donePreparing : function(socket) {
        socket.on('done preparing', function (data) {
            socket.broadcast.emit('done preparing', data);
            console.log('done preparing', data);
            var search = {};
            search['fileName'] = data.fileName;
            var update = {};
            update[data.field] = data.value;
            ClientService.updateClient(search, update, function(err, client) {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
};

module.exports = ClientsSockets;