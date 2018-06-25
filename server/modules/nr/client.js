let to = require('../../helpers/to');
let Client = require('../../models/nr/NR');

let ClientService = {
    find: async function(query) {
        return await to(Client.find(query).lean().exec());
    },

    update: async function(search, update) {
        return await to(Client.update(search, update).lean().exec());
    },

    getYears: async function() {
        return await to(Client.find({}).distinct('year'));
    },

    findOsPyt: async function() {
        let search = {};
        search['pytRec'] = { $ne: '' };
        search['pytAmount'] = { $ne: '' };
        return await to(Client.find(search).lean().exec());
    },

    findOsSigned: async function() {
        let search = {};
        search['signed'] = { $ne: '' };
        return await to(Client.find(search).lean().exec());
    }
}

module.exports = ClientService;