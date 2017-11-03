/**
 * Created by ander on 2017-09-15.
 */
var getFileName = require('./utils/get_file_name');
var ClientService = require('../modules/client');

var IndexSockets = {
    monitorUpdate: function(socket) {
        socket.on('monitoring sheet update', function (data) {
            socket.broadcast.emit('monitoring sheet update', data);
            console.log(data);
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

module.exports = IndexSockets;