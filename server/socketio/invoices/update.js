const InvoiceService = require('../../modules/invoice/invoice');

module.exports = async (socket, data) => {
    socket.broadcast.emit('update invoice', data);

    const query = { _id: data.id };
    const update = {};
    update[data.field] = data.value;
    if (data.value !== '' && data.field === 'pytReceived') update.pytDate = new Date();

    await InvoiceService.update(query, update);
}