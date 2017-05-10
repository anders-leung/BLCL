/**
 * Created by ander on 2017-05-09.
 */
var XLSX = require('xlsx');
var Client = require('../../models/Client');
var Dependent = require('../../models/Dependent');
var Person = require('../../models/Person');
var TaxableIncome = require('../../models/TaxableIncome');
var TaxCredits = require('../../models/TaxCredits');
var TotalIncome = require('../../models/TotalIncome');

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