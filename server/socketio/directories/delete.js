const ClientService = require('../../modules/clients/client');
const T1Service = require('../../modules/t1/client');
const NRService = require('../../modules/nr/client');

module.exports = async (data) => {
    const { model, id } = data;

    switch (model) {
        case 'clients':
            await ClientService.delete(id);
            break;
        case 't1':
            await T1Service.delete(id);
            break;
        case 'nr':
            await NRService.delete(id);
            break;
    }
}