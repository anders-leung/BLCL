const to = require('../../helpers/to');
const Client = require('../../models/client/Client');
const T2 = require('../../models/t2/T2');

const T2Service = {
    get: async (query) => {
        return await to(T2.find(query));
    },

    update: async (query, update) => {
        return await to(T2.findOneAndUpdate(query, update, { new: true, upsert: true }));
    },

    setup: async () => {
        const [err, clients] = await to(Client.find({ services: 'FS' }));
        
    }
}

module.exports = T2Service;