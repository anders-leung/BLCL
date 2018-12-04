const to = require('../../helpers/to');
const Description = require('../../models/invoice/Description');

module.exports = {
    update: async (query, update) => {
        return await to(Description.findOneAndUpdate(query, update, { upsert: true, new: true }));
    },

    get: async (query) => {
        return await to(Description.find(query));
    },

    getAll: async () => {
        const [err, descriptions] = await to(Description.find({}));
        
        const descriptionsMap = {};
        descriptions.map((descript) => {
            const { service, description } = descript
            descriptionsMap[service] = description;
        });
        
        return [err, descriptionsMap];
    },

    setup: async () => {
        const descriptions = require('./descriptions');
        Object.keys(descriptions).map((service) => {
            const description = new Description({
                service: service.toUpperCase(),
                description: descriptions[service],
            });

            description.save((err) => {
                if (err) {
                    console.log('description setup err: ', err);
                }
            });
        });
    },

    getServices: async () => {
        const [err, descriptions] = await to(Description.find({}));
        const services = descriptions.map((description) => {
            return description.service;
        });
        return [err, services];
    }
}