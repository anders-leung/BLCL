/**
 * Created by ander on 2017-09-18.
 */
var ClientService = require('../routes/api/client');

var ClientsSockets = {
    donePreparing : function(socket) {
        socket.on('done preparing', function (data) {
            socket.broadcast.emit('done preparing', data);
            var search = {};
            search['tel.number'] = data.phone_number;
            var update = {};
            console.log(data.value);
            update['preparerDone'] = data.value;
            ClientService.updateClient(search, update);
        });
    }
};

module.exports = ClientsSockets;