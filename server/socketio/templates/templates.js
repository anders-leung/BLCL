const TemplateService = require('../../modules/template/template');

module.exports = async (socket, data) => {
    const { action, _id } = data;
    let { variables } = data;
    delete data.action;

    switch (action) {
        case 'create':
            await TemplateService.update(data, data);
            break;
        case 'update':
            await TemplateService.update({ _id }, { variables });
            break;
        case 'delete':
            await TemplateService.delete({ _id });
            break;
    }
}