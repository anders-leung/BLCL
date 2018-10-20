const ClientService = require('../clients/client');
const Company = require('../../models/t2/Company');
const to = require('../../helpers/to');

const T2Service = {
    create: async (data) => {
        // const [err, client] = await ClientService.create(getClient(data));
        // if (err) return err;
        // data.client = client;
        return await to(new Company(data).save());
    },

    get: async (query) => {
        return await to(Company.find(query));
    }
}

module.exports = T2Service;