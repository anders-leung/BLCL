const mongoose = require('mongoose');
const XLSX = require('xlsx-populate');
const ClientService = require('./client');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test');

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
        if (!value) return '';
        value = value.toString();
        return value;
    }

    const name = getValue(1);
    let yearEnd = getValue(7);

    if (!yearEnd) return;

    yearEnd = XLSX.numberToDate(yearEnd);
    
    await ClientService.update({ name }, { yearEnd });
}

const args = process.argv.slice(2);
loadFromExcel(args[0]);