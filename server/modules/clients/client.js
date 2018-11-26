const to = require('../../helpers/to');
const Client = require('../../models/client/Client');

const ClientService = {
    create: async (data) => {
        const client = new Client(data);
        return await to(client.save());
    },

    get: async (query) => {
        return await to(Client.find(query));
    },

    update: async (query, update, one = true) => {
        let updateType = 'updateOne';
        if (!one) updateType = 'updateMany';
        return await to(Client[updateType](query, update));
    }
};

module.exports = ClientService;