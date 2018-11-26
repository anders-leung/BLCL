const mongoose = require('mongoose');
const XLSX = require('xlsx-populate');
const ClientService = require('./client');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test');

function fn(field) {
    return new Function('value', 'update', 'update.' + field + ' = value;');
}

let fields = {
    '2': fn('address.street'),
    '3': fn('address.city'),
    '4': fn('address.province'),
    '5': fn('address.postalCode'),
    '6': fn('email'),
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
        if (value) value = value.toString();
        return value;
    }

    const name = getValue(1);
    const update = { address: {} };
    for (let col = 2; col < 7; col++) {
        let value = getValue(col);
        if (!value) continue;
        fields[col](value, update);
    }

    if (Object.keys(update.address).length === 0) delete update.address;
    
    const [err, client] = await ClientService.update({ name }, update);
    if (err) console.log(err);
}

const args = process.argv.slice(2);
loadFromExcel(args[0]);