const mongoose = require('mongoose');
const XLSX = require('xlsx-populate');
const ClientService = require('./client');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/');

function fn(field) {
    return new Function('value', 'client', 'client.' + field + ' = value;');
}

let fields = {
    '1': fn('name'),
    '2': fn('contact.title'),
    '3': fn('contact.firstName'),
    '4': fn('contact.lastName'),
    '5': fn('phone'),
    '6': fn('fax'),
    '7': fn('yearEnd'),
    '8': function(value, client) {
        client.services = value.split(', ');
    },
    '9': fn('remark'),
    '10': fn('status'),
    '11': fn('bnNumber'),
    '12': fn('pstNumber'),
    '13': fn('incorp.number'),
    '14': fn('incorp.date'),
    '15': fn('wcbNumber'),
}

function loadFromExcel(filepath) {
    XLSX.fromFileAsync(filepath).then(workbook => {
        let sheet = workbook.sheet('Address Book');
        let row = 2;
        let stopperCell = sheet.row(row).cell(1);
        while (stopperCell.value()) {
            readClient(sheet, row);
            row++;
            stopperCell = sheet.row(row).cell(1);
        }
    });
}

async function readClient(sheet, row) {
    function getValue(col) {
        let value = sheet.row(row).cell(col).value();
        if (value) value = value.toString().toUpperCase();
        return value;
    }

    const client = { contact: {}, incorp: {} };

    for (let col = 1; col < 15; col++) {
        let value = getValue(col);
        if (!value) continue;
        fields[col](value, client);
    }

    if (Object.keys(client.contact).length === 0) delete client.contact;
    if (Object.keys(client.incorp).length === 0) delete client.incorp;

    await ClientService.create(client);
}

const args = process.argv.slice(2);
loadFromExcel(args[0]);