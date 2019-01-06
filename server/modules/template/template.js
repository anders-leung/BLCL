const to = require('../../helpers/to');
const Template = require('../../models/template/Template');

module.exports = {
    get: async (query) => {
        return await to(Template.find(query));
    },

    update: async (query, update) => {
        return await to(Template.findOneAndUpdate(query, update, { upsert: true }));
    },

    delete: async (query) => {
        return await to(Template.findByIdAndDelete(query));
    }
}