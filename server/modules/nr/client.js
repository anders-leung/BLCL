let to = require('../../helpers/to');
let Client = require('../../models/nr/NR');
let helper = require('./imports/client');

let ClientService = {
    find: async function(query) {
        return await to(Client.find(query).lean().exec());
    },

    update: async function(search, update) {
        return await to(Client.findOneAndUpdate(search, update, { new: true }));
    },

    create: async function(data) {
        let client = new Client(data);
        client.name = helper.getFileName(client);
        client.pathName = helper.getPathName(client);
        return await to(client.save());
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
    },

    delete: async (id) => {
        return await to(Client.findByIdAndDelete(id));
    }
}

module.exports = ClientService;