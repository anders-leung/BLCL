/**
 * Created by ander on 2017-11-22.
 */
let T1Service = require('../modules/t1/client');
let NRService = require('../modules/nr/client');

const updateInvoice = require('./invoices/update');
const weekChange = require('./invoices/week-change');
const description = require('./invoices/description');

const templates = require('./templates/templates');

const directoryDelete = require('./directories/delete');

let ClientsSocket = {
    ClientUpdate : async function(socket) {
        socket.on('update t1', function (data) {
            console.log(data);
            if (data.field == 'preparer') {
                T1Service.findClient({ _id : data.id }, function(err, client) {
                    data.client = client[0];
                    socket.broadcast.emit('job assignment', data);
                })
            }
            socket.broadcast.emit('update t1', data);

            if (data.field == 'packed') data.value = data.value == 'Y';
            let search = { _id: data.id };
            let update = { [data.field]: data.value };
            
            T1Service.updateClient(search, update, false, function(err, client) {
                if (err) console.log(err);
            });
        });

        socket.on('update nr', async function(data) {
            socket.broadcast.emit('update nr', data);

            let search = { name: data.fileName, year: data.year };
            let update = {};
            update[data.service + '.' + data.field] = data.value;

            let err, result;
            [err, result] = await NRService.update(search, update);
            if (err) console.log(err);
        });


        // Invoice socket handling
        socket.on('update invoice', async (data) => {
            await updateInvoice(socket, data);
        });

        socket.on('invoice week change', async (search) => {
            await weekChange(socket, search);
        });

        socket.on('description update', async (data) => {
            await description(socket, data);
        });


        // Template socket handling
        socket.on('templates', templates);
        
        // Client deletion
        socket.on('directory delete', directoryDelete);
    }
};

module.exports = ClientsSocket;