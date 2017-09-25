/**
 * Created by ander on 2017-09-15.
 */
var ClientService = require('../modules/client');
var UserService = require('../modules/user');
var AssignmentService = require('../modules/assignment');

var IndexSockets = {
    monitorUpdate: function(socket) {
        socket.on('monitoring sheet update', function (data) {
            socket.broadcast.emit('monitoring sheet update', data);
            var search = {};
            search['tel.number'] = data.phone_number;
            var update = {};
            update[data.field] = data.value;
            ClientService.updateClient(search, update);
        });
    },

    jobAssignments : function(socket) {
        socket.on('assigning jobs', function(data) {
            socket.broadcast.emit('assigning jobs', data);

            var clientSearch = {};
            var userSearch = {};
            clientSearch['tel.number'] = data.phone_number;
            userSearch['initials'] = data.preparer;

            ClientService.findClient(clientSearch, function(err, client) {
                if (err) {
                    console.log(err);
                } else {
                    ClientService.updateClient(clientSearch, { preparer : data.preparer }, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    UserService.findOneUser(userSearch, function(err, user) {
                        AssignmentService.createOrUpdateAssignment(user, client[0], function(err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
                }
            });
        });
    }
};

module.exports = IndexSockets;