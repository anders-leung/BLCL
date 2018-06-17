/**
 * Created by ander on 2017-11-22.
 */
var ClientService = require('../modules/nr/client');

var ClientsSocket = {
    ClientUpdate : function(socket) {
        socket.on('nr update', function (data) {
            console.log(data);
            if (data.field == 'preparer') {
                ClientService.findClient({ fileName : data.fileName }, function(err, client) {
                    data.client = client[0];
                    socket.broadcast.emit('job assignment', data);
                })
            }
            socket.broadcast.emit('client side update', data);

            if (data.field == 'packed') data.value = data.value == 'Y';
            var search = {};
            search['fileName'] = data.fileName;
            var update = {};
            update[data.field] = data.value;

            if (data.field == 'pytAmount') {
                update['pytDate'] = getDate();
            }
            
            ClientService.updateClient(search, update, false, function(err, client) {
                if (err) console.log(err);
            });
        });

        socket.on('nr get', async function(data) {
            let err, clients;
            [err, clients] = await ClientService.find({ year: data.year });
            socket.broadcast.emit('nr get response', { clients: clients, user: data.user });
        });
    }
};

module.exports = ClientsSocket;