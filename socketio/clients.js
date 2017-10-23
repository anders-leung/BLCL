/**
 * Created by ander on 2017-09-18.
 */
var ClientService = require('../modules/client');
var Assignment = require('../models/Assignment');

var ClientsSockets = {
    donePreparing : function(socket) {
        socket.on('done preparing', function (data) {
            socket.broadcast.emit('done preparing', data);
            var search = {};
            search['tel.number'] = data.phone_number;
            var update = {};
            update['preparerDone'] = data.value;
            ClientService.updateClient(search, update, function(err, client) {
                if (err) {
                    console.log(err);
                } else {
                    search = {};
                    search[client] = client_id;
                    update = {};
                }
            });
        });
    }
};

module.exports = ClientsSockets;