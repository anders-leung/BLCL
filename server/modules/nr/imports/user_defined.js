let XLSX = require('xlsx-populate');

let Client = require('../../../models/nr/NR');

let clientNames = require('./client');

let fields = require('./user_defined_fields');

function loadFromExcel(filepath) {
    XLSX.fromFileAsync(filepath).then((workbook) => {
        let sheet = workbook.sheet('Address Book');
        let row = 2;
        let value = sheet.row(row).cell(8).value();
        while (value) {
            if (value == 'Active' && sheet.row(row).cell(3).value() != 'AG') readClient(sheet, row);
            row++;
            value = sheet.row(row).cell(8).value();
        }
    });
}

function readClient(sheet, row) {
    let client = new Client();
    client.properties = [];
    for (let col = 1; col < 85; col++) {
        let value = sheet.row(row).cell(col).value();
        if (!value) continue;
        value = value.toString().toUpperCase();
        if ((col > 14 && col < 21) || col == 23) value = { street: value };
        if (fields[col]) fields[col](value, client);
    }

    client.name = clientNames.getFileName(client);
    client.pathName = clientNames.getPathName(client);
    client.year = 2018;
    client.save(err => {
        if (err) console.log(err);
    });
}

module.exports = loadFromExcel;