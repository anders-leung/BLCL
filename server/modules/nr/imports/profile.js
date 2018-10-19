let XLSX = require('xlsx-populate');
let fs = require('fs');

let Client = require('../../../models/nr/NR');

let clientNames = require('./client');
let dateToString = require('../../utils/dateToString');

function loadFromExcel(filepath) {
    let workbook = XLSX.fromFileAsync(filepath).then(workbook => {
        let sheet = workbook.sheet('profile');
        let row = 1;
        let stopperCell = sheet.row(row).cell(1);
        while (stopperCell.value()) {
            readClient(sheet, row);
            row++;
            stopperCell = sheet.row(row).cell(1);
        }
    });
}

function readClient(sheet, row) {
    let client = setClient(sheet, row);
    console.log('client: ', client)

    Client.findOneAndUpdate({ name: client.name }, client, { upsert: true, new: true }).lean().exec((err, client) => {
        //if (err) console.log('err: ', err);
        //console.log('client: ', client)
    });
}

function setClient(sheet, row) {
    function getValue(col) {
        return sheet.row(row).cell(col).value();
    }

    let client = {};
    let value = getValue(1);
    let person = 'husband';
    if (value != 'MR') person = 'wife';
    client[person] = {
        firstName: getValue(2),
        lastName: getValue(3),
        dob: dateToString(new Date(getValue(4))),
        sin: getValue(5)
    }

    value = getValue(6);
    if (value) {
        if (value == 'MR') person = 'husband';
        else person = 'wife';
        client[person] = {
            firstName: getValue(7),
            lastName: getValue(8),
            dob: dateToString(new Date(getValue(9))),
            sin: getValue(10)
        }
    }

    client.name = clientNames.getFileName(client);
    client.pathName = clientNames.getPathName(client);

    client.phones = [];
    client.address = {};

    for (let i = 11; i < 19; i++) {
        value = getValue(i);
        if (!value) continue;
        if (i == 11 || i == 12) client.phones.push(value);
        else if (i == 13) client.address.apartment = value;
        else if (i == 14) client.address.street = value;
        else if (i == 15) client.address.city = value;
        else if (i == 16) client.address.province = value;
        else if (i == 17) client.address.postalCode = value;
        else if (i == 18) client.address.country = value;
    }

    return client;
}

module.exports = loadFromExcel;