/**
 * Created by ander on 2017-05-09.
 */
var XLSX = require('xlsx');

function excelToPerson(workbook) {

}

function excelToClient(workbook) {

}

function readExcel(filepath) {
    var workbook = XLSX.readFile(filepath);
    console.log(workbook);
    excelToClient(workbook);
}

module.exports = readExcel;