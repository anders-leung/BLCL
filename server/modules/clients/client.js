const fs = require('fs');

const to = require('../../helpers/to');
const Client = require('../../models/client/Client');
const DocxService = require('../docx/docx');

const ClientService = {
    create: async (data) => {
        const client = new Client(data);
        return await to(client.save());
    },

    get: async (query) => {
        return await to(Client.find(query));
    },

    update: async (query, update) => {
        return await to(Client.findOneAndUpdate(query, update, { new: true }));
    },

    fields: () => {
        return Object.keys(Client.schema.paths);
    },

    updateFiles: async (id) => {
        let [err, client] = await to(Client.findById(id).populate('files'));
        if (err) return [err, null];

        const clientDirectory = `${global.fileDirectory}/${client.name}`;
        if (!fs.existsSync(clientDirectory)) {
            fs.mkdirSync(clientDirectory);
        }
        
        const files = fs.readdirSync(clientDirectory);
        files.map((file) => {
            fs.unlinkSync(`${clientDirectory}/${file}`);
        });

        if (err) return [err, null];

        client.files.map((file) => {
            DocxService.saveAs(client, file);
        });

        return [null, null];
    },

    getStatus: () => {
        return Client.schema.path('status').enumValues;
    }
};

module.exports = ClientService;