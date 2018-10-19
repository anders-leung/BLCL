const to = require('../../helpers/to');
const Client = require('../../models/client/Client');

const ClientService = {
    create: async (data) => {
        const client = new Client(data);
        return await to(client.save());
    },

    get: async (query) => {
        return await to(Client.find(query));
    }
};

module.exports = ClientService;