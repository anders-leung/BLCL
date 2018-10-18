let to = require('../../helpers/to');
let Client = require('../../models/nr/NR');
let helper = require('./imports/client');

function cleanValues(data) {
    let phones = [];
    let emails = [];
    let properties = [];
    let address = {};
    
    for (let key in data) {
        data[key] = data[key].toUpperCase().trim();
    }
    if (Object.keys(address).length > 0) properties.push(address);
    
    data.phones = phones.filter((x) => { return x });
    data.emails = emails.filter((x) => { return x });
    data.properties = properties.filter((x) => { return x });
}

let ClientService = {
    find: async function(query) {
        return await to(Client.find(query).lean().exec());
    },

    update: async function(search, update) {
        cleanValues(update);
        return await to(Client.update(search, update).lean().exec());
    },

    create: async function(data) {
        cleanValues(data);
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
    }
}

module.exports = ClientService;