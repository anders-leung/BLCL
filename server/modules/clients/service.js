const to = require('../../helpers/to');
const Service = require('../../models/client/Service');

const ServiceService = {
    get: async (query) => {
        return await to(Service.find(query));
    },

    update: async (query, update) => {
        return await to(Service.findOneAndUpdate(query, update, { new: true, upsert: true }));
    },
};

module.exports = ServiceService;