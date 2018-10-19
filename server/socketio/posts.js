/**
 * Created by ander on 2017-11-22.
 */
let T1Service = require('../modules/t1/client');
let NRService = require('../modules/nr/client');
let InvoiceService = require('../modules/invoice/invoice');

let ClientsSocket = {
    ClientUpdate : async function(socket) {
        socket.on('client side update', function (data) {
            console.log(data);
            if (data.field == 'preparer') {
                T1Service.findClient({ fileName : data.id }, function(err, client) {
                    data.client = client[0];
                    socket.broadcast.emit('job assignment', data);
                })
            }
            socket.broadcast.emit('client side update', data);

            if (data.field == 'packed') data.value = data.value == 'Y';
            let search = {};
            search['fileName'] = data.id;
            let update = {};
            update[data.field] = data.value;
            
            T1Service.updateClient(search, update, false, function(err, client) {
                if (err) console.log(err);
            });
        });

        socket.on('nr update', async function(data) {
            socket.broadcast.emit('nr update', data);

            let search = { name: data.fileName, year: data.year };
            let update = {};
            update[data.service + '.' + data.field] = data.value;

            let err, result;
            [err, result] = await NRService.update(search, update);
            if (err) console.log(err);
        });

        socket.on('update invoice', async (data) => {
            socket.broadcast.emit('update invoice', data);

            const query = { _id: data.id };
            const update = {};
            update[data.field] = data.value;
            if (data.value !== '') update.pytDate = new Date();

            await InvoiceService.update(query, update);
        });

        socket.on('invoice week change', async (search) => {
            const { field, week, company } = search;
            const query = { company };
            if (field === 'pytDate') {
                query.pytReceived = {
                    $ne: '',
                    $exists: true,
                };
            } else {
                query.$or = [
                    { pytReceived: '' },
                    { pytReceived: { $exists: false } },
                ];
            }

            let err, invoices;
            if (week) [err, invoices] = await InvoiceService.getByWeek(query, field, week);
            else [err, invoices] = await InvoiceService.get(query);
            
            let data;
            switch(field) {
                case 'pytDate':
                    data = getPaymentData(invoices);
                case 'issueDate':
                    data = getSalesData(invoices);
            }
            socket.emit('update payments data', data);
        });
    }
};

function getPaymentData(invoices) {                             
    return invoices.map((invoice) => {
        return [
            invoice.client.name,
            invoice.number,
            (invoice.pytReceived == 'ADV' ? invoice.total : ''),
            (invoice.pytReceived == 'INV' ? invoice.total : ''),
            (invoice.pytReceived == 'CA' ? invoice.total : ''),
            (invoice.pytReceived == 'CHQ' ? invoice.total : ''),
            (invoice.pytReceived == 'DD' ? invoice.total : ''),
            (invoice.pytReceived == 'ET' ? invoice.total : ''),
            '',
        ];
    });
}

function getSalesData(invoices) {
    const services = InvoiceService.getServices();
    return invoices.map((invoice) => {
        const data = [
            invoice.client.name,
            invoice.number,
        ]
        let gst = 0;
        for (const service of services) {
            const match = invoice.services.filter(x => x.service === service)[0];
            if (match) {
                data.push(match.amount);
                gst += parseFloat(match.gst);
            } else {
                data.push('');
            }
        }
        data.push(parseFloat(gst).toFixed(2));
        data.push('');
        return data;
    });
}

module.exports = ClientsSocket;