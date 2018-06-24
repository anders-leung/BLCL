let to = require('../../helpers/to');
let Client = require('../../models/nr/NR');

let ClientService = {
    find: async function(query) {
        return await to(Client.find(query).lean().exec());
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