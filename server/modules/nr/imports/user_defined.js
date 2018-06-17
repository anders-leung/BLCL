let XLSX = require('xlsx-populate');
let fs = require('fs');

let Client = require('../../../models/nr/NR');
let Agent = require('../../../models/nr/Contact');

let clientNames = require('./client');

let fields = require('./user_defined_fields');

function loadFromExcel(filepath) {
    let workbook = XLSX.fromFileAsync(filepath).then(workbook => {
        let sheet = workbook.sheet('Address Book');
        let row = 2;
        let value = sheet.row(row).cell(8).value();
        while (value) {
            if ((value == 'Active' || value == 'Pending') && sheet.row(row).cell(3).value() != 'AG') readClient(sheet, row);
            row++;
            value = sheet.row(row).cell(8).value();
        }
    });
}

function readClient(sheet, row) {
    let client = new Client();
    client.properties = [];
    client.cc.completionDates = [];
    let agent = new Agent();
    for (let col = 1; col < 85; col++) {
        let value = sheet.row(row).cell(col).value();
        if (!value) continue;
        value = value.toString().toUpperCase();
        if ((col > 14 && col < 21) || col == 23) value = { street: value };
        let model = client;
        if (col > 21 && col < 30) model = agent;
        if (fields[col]) fields[col](value, model);
    }

    client.name = clientNames.getFileName(client);
    client.pathName = clientNames.getPathName(client);
    client.year = 2018;
    client.save(err => {
        if (err) console.log('err: ', err);
    });
}

module.exports = loadFromExcel;