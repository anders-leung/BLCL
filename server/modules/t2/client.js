const to = require('../../helpers/to');
const Client = require('../../models/client/Client');
const T2 = require('../../models/t2/T2');
const Service = require('../../models/client/Service');

const T2Service = {
    get: async (query) => {
        return await to(T2.find(query)
            .populate({ path: 'client', populate: { path: 'services', model: 'Service' } }));
    },

    update: async (query, update) => {
        return await to(T2.findOneAndUpdate(query, update, { new: true, upsert: true }));
    },

    setup: async () => {
        let err, services, clients, anyT2s;
        [err, anyT2s] = await T2Service.get({});

        if (anyT2s.length > 0) return [null, null];

        services = ['FS', 'GST', 'BK'];
        services = services.map((service) => {
            return new RegExp(service);
        });
        [err, services] = await to(Service.find({ name: { $in: services } }));

        services = services.map((service) => {
            return service._id;
        });
        [err, clients] = await to(Client.find({ services: { $in: services } }));
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