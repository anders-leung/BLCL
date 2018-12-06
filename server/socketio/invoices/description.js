const DescriptionService = require('../../modules/invoice/description');

module.exports = async (socket, data) => {
    const query = {
        service: data.service
    };

    const [err, update] = await DescriptionService.update(query, data);

    if (err) {
        return console.log('socket description update err: ', err)
    } else {
        socket.emit('description update', update);
    }
}