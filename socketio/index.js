/**
 * Created by ander on 2017-09-15.
 */
var ClientService = require('../routes/api/client');
var UserService = require('../routes/api/user');

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
            var search = {};
            search['initials'] = data.preparer;
            ClientService.findClient({ 'tel.number' : data.phone_number }, function(err, client) {
                if (err) {
                    console.log(err);
                } else {
                    UserService.addClient(search, { 'clients' : client[0] }, function(err) {
                        console.log(err);
                    });
                }
            });
        });
    }
};

module.exports = IndexSockets;