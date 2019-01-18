const to = require('../../helpers/to');
const Client = require('../../models/client/Client');
const T2 = require('../../models/t2/T2');

const T2Service = {
    get: async (query) => {
        return await to(T2.find(query).populate({ path: 'client', populate: { path: 'services', model: 'Service' } }));
    },

    update: async (query, update) => {
        return await to(T2.findOneAndUpdate(query, update, { new: true, upsert: true }));
    },

    setup: async () => {
        let err, clients, anyT2s;
        [err, anyT2s] = await T2Service.get({});

        if (anyT2s.length > 0) return [null, null];

        const t2Services = ['FS', 'GST', 'BK'];
        [err, clients] = await to(Client.find({ services: { $in: t2Services } }));
        if (err) return [err, null];

        clients.map((client) => {
            const { _id } = client;
            const t2 = new T2({ client: _id });
            t2.save((err) => {
                if (err) console.log('T2 setup err: ', err);
            });
        });
    }
}

module.exports = T2Service;