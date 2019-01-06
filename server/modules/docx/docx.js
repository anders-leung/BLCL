const jszip = require('jszip');
const docx = require('docxtemplater');

const fs = require('fs');

const DocxService = {
    saveAs: async (client, template) => {
        const { name, variables } = template;

        const content = fs.readFileSync(`${global.templateDirectory}/${name}.docx`);
        const zip = jszip(content);
        const doc = new docx();
        doc.loadZip(zip);

        const data = {};
        variables.map((variable) => {
            data[variable] = client[variable];
            if (variable === 'address') {
                data[variable] = client[variable].fullAddress;
            }
        });

        doc.setData(data);

        try {
            doc.render();
        } catch (err) {
            return err;
        }

        const buffer = doc.getZip().generate({ type: 'nodebuffer' });
        fs.writeFileSync(`${global.fileDirectory}/${client.name}/${name}.docx`, buffer);
    }
}

module.exports = DocxService;