let XLSX = require('xlsx-populate');
let fs = require('fs');

let Client = require('../../../models/nr/NR');
let Agent = require('../../../models/nr/Contact');

let ClientService = require('../client');

function fn(field) {
    return new Function('value', 'client', 'client.' + field + ' = value;');
}

let fields = {
    '2': fn('address.street'),
    '3': function(value, client) {
        client.address.street += ', ' + value;
    },
    '5': fn('address.country'),
    '7': fn('email[0]'),
    '9': fn('email[1]'),
    '11': fn('email[2]'),
    '13': fn('phones[0]'),
    '15': fn('phones[1]'),
    '17': fn('phones[2]'),
}

function loadFromExcel(filepath) {
    let workbook = XLSX.fromFileAsync(filepath).then(workbook => {
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

    let value = getValue(1);
    console.log('value: ', value)
    let err, clients;
    [err, clients] = await ClientService.find({ name: { $regex: '/' + value + '/' } });

    if (clients.length != 1) return;
    let client = clients[0];

    for (let col = 2; col < 18; col++) {
        let value = getValue(col);
        if (!value) continue;
        if (fields[col]) fields[col](value, client);
    }

    console.log(client);
}

module.exports = loadFromExcel;