/**
 * Created by ander on 2017-05-09.
 */
var XLSX = require('xlsx');
var fs = require('fs');
var Client = require('../models/Client');
var clientNames = require('./utils/client');

var fields = {
    'P1' : function(worksheet, cell, client) {
        client.interviewer = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'X1' : function(worksheet, cell, client) {
        client.pickupDate = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'D4' : function(worksheet, cell, client) {
        client.husband.citizenship = !!worksheet[cell];
    },

    'E4' : function(worksheet, cell, client) {
        client.wife.citizenship = !!worksheet[cell];
    },

    'I4' : function(worksheet, cell, client) {
        client.husband.election = !!worksheet[cell];
    },

    'L4' : function(worksheet, cell, client) {
        client.wife.election = !!worksheet[cell];
    },

    'P4' : function(worksheet, cell, client) {
        client.preparer = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'V4' : function(worksheet, cell, client) {
        client.checker = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'B7' : function(worksheet, cell, client) {
        client.interviewDate = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'I7' : function(worksheet, cell, client) {
        client.tel.check = false;
        client.tel.number = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'S7' : function(worksheet, cell, client) {
        client.t1135 = (worksheet[cell] ? worksheet[cell].v.toUpperCase() : '');
    },

    'V7' : function(worksheet, cell, client) {
        client.stocks = !!worksheet[cell];
    },

    'Y7' : function(worksheet, cell, client) {
        client.t777 = !!worksheet[cell];
    },

    'I8' : function(worksheet, cell, client) {
        client.cell.check = false;
        client.cell.number = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'T8' : function(worksheet, cell, client) {
        client.slips = !!worksheet[cell];
    },

    'V8' : function(worksheet, cell, client) {
        client.selfEmployed = !!worksheet[cell];
    },

    'Y8' : function(worksheet, cell, client) {
        client.rental = !!worksheet[cell];
    },

    'Z8' : function(worksheet, cell, client) {
        client.new = !!worksheet[cell];
    },

    'D9' : function(worksheet, cell, client) {
        client.email.check = false;
        client.email.value = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'S9' : function(worksheet, cell, client) {
        client.group = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'V9' : function(worksheet, cell, client) {
        client.numberOfReturns = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'D10' : function(worksheet, cell, client) {
        var address;
        if (worksheet[cell]) {
            address = worksheet[cell].v;
        } else {
            return;
        }
        var address_tokens = address.split(',');
        var units = address_tokens[0].split('-');

        client.address.street = address_tokens[0].trim();

        if (units.length > 1) {
            client.address.apartment = units[0].trim();
            client.address.street = units[1].trim();
        }

        client.address.city = address_tokens[1].trim();

        if (address_tokens.length == 3) {
            var end_token = address_tokens[2].trim().split(' ');
            client.address.province = end_token[0];
            client.address.postalCode = end_token[1] + ' ' + end_token[2];
        } else if (address_tokens.length == 4) {
            client.address.province = address_tokens[2].trim();
            client.address.postalCode = address_tokens[3].trim();
        }

        client.address.check = false;
    },

    'W10' : function(worksheet, cell, client) {
        client.husband.noa = !!worksheet[cell];
    },

    'W11' : function(worksheet, cell, client) {
        client.wife.noa = !!worksheet[cell];
    },

    'Y10' : function(worksheet, cell, client) {
        client.method = (worksheet[cell] ? worksheet[cell].v.toUpperCase() : '');
    },

    'B12' : function(worksheet, cell, client) {
        client.husband.firstName = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'H12' : function(worksheet, cell, client) {
        client.husband.lastName = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'P12' : function(worksheet, cell, client) {
        client.wife.firstName = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'V12' : function(worksheet, cell, client) {
        client.wife.lastName = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'B14' : function(worksheet, cell, client) {
        client.husband.dateOfBirth = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'K14' : function(worksheet, cell, client) {
        client.husband.departure = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'P14' : function(worksheet, cell, client) {
        client.wife.dateOfBirth = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'X14' : function(worksheet, cell, client) {
        client.wife.departure = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'B15' : function(worksheet, cell, client) {
        client.husband.sin = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'H15' : function(worksheet, cell, client) {
        client.husband.status = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'P15' : function(worksheet, cell, client) {
        client.wife.sin = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'V15' : function(worksheet, cell, client) {
        client.wife.status = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'E16' : function(worksheet, cell, client) {
        client.dependent1.name = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'L16' : function(worksheet, cell, client) {
        client.dependent1.relationship = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'M16' : function(worksheet, cell, client) {
        client.dependent2.name = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'T16' : function(worksheet, cell, client) {
        client.dependent2.relationship = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'U16' : function(worksheet, cell, client) {
        client.dependent3.name = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'Z16' : function(worksheet, cell, client) {
        client.dependent3.relationship = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'E17' : function(worksheet, cell, client) {
        client.dependent1.dateOfBirth = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'M17' : function(worksheet, cell, client) {
        client.dependent2.dateOfBirth = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'U17' : function(worksheet, cell, client) {
        client.dependent3.dateOfBirth = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'E18' : function(worksheet, cell, client) {
        client.dependent1.sin = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'M18' : function(worksheet, cell, client) {
        client.dependent2.sin = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'U18' : function(worksheet, cell, client) {
        client.dependent3.sin = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'B20' : function(worksheet, cell, client) {
        client.husband.t4 = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'H20' : function(worksheet, cell, client) {
        client.husband.t5.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'L20' : function(worksheet, cell, client) {
        client.husband.t5.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'D21' : function(worksheet, cell, client) {
        client.husband.otherIncome.value104 = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'D22' : function(worksheet, cell, client) {
        client.husband.otherIncome.value130 = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'H21' : function(worksheet, cell, client) {
        client.husband.t5Other.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'L21' : function(worksheet, cell, client) {
        client.husband.t5Other.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'D23' : function(worksheet, cell, client) {
        client.husband.foreignIncome.div.currency = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'E23' : function(worksheet, cell, client) {
        client.husband.foreignIncome.div.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'D24' : function(worksheet, cell, client) {
        client.husband.foreignIncome.empl.currency = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'E24' : function(worksheet, cell, client) {
        client.husband.foreignIncome.empl.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'H24' : function(worksheet, cell, client) {
        client.husband.foreignIncome.country = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'H23' : function(worksheet, cell, client) {
        client.husband.t3.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'L23' : function(worksheet, cell, client) {
        client.husband.t3.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'L24' : function(worksheet, cell, client) {
        client.husband.t5007 = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'B25' : function(worksheet, cell, client) {
        client.husband.t4A = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'H25' : function(worksheet, cell, client) {
        client.husband.t5008.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'L25' : function(worksheet, cell, client) {
        client.husband.t5008.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'B26' : function(worksheet, cell, client) {
        client.husband.t4AOAS = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'H26' : function(worksheet, cell, client) {
        client.husband.t5013.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'L26' : function(worksheet, cell, client) {
        client.husband.t5013.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'B27' : function(worksheet, cell, client) {
        client.husband.t4AP.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'B28' : function(worksheet, cell, client) {
        client.husband.t4AP.split = !!worksheet[cell];
    },

    'H27' : function(worksheet, cell, client) {
        client.husband.rental.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'K27' : function(worksheet, cell, client) {
        client.husband.rental.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'M27' : function(worksheet, cell, client) {
        client.husband.rental.gstReturn = !!worksheet[cell];
    },

    'B29' : function(worksheet, cell, client) {
        client.husband.t4E = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'H29' : function(worksheet, cell, client) {
        client.husband.selfEmployed.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'K29' : function(worksheet, cell, client) {
        client.husband.selfEmployed.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'M29' : function(worksheet, cell, client) {
        client.husband.selfEmployed.gstReturn = !!worksheet[cell];
    },

    'B31' : function(worksheet, cell, client) {
        client.husband.t4RSP = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'H31' : function(worksheet, cell, client) {
        client.husband.supportReceived = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'D33' : function(worksheet, cell, client) {
        client.husband.uccb = !!worksheet[cell];
    },

    'B36' : function(worksheet, cell, client) {
        client.husband.rrsp.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'F36' : function(worksheet, cell, client) {
        client.husband.rrsp.spouse = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'H36' : function(worksheet, cell, client) {
        client.husband.value777 = !!worksheet[cell];
    },

    'B37' : function(worksheet, cell, client) {
        client.husband.hbp = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'H37' : function(worksheet, cell, client) {
        client.husband.supportMade = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'I38' : function(worksheet, cell, client) {
        client.husband.moving = !!worksheet[cell];
    },

    'R38' : function(worksheet, cell, client) {
        client.husband.unionDue = !!worksheet[cell];
    },

    'W38' : function(worksheet, cell, client) {
        client.husband.disabilitySupports = !!worksheet[cell];
    },

    'B41' : function(worksheet, cell, client) {
        client.husband.installation = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'I41' : function(worksheet, cell, client) {
        client.husband.tuition = !!worksheet[cell];
    },

    'W41' : function(worksheet, cell, client) {
        client.husband.studentLoan = !!worksheet[cell];
    },

    'P20' : function(worksheet, cell, client) {
        client.wife.t4 = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'V20' : function(worksheet, cell, client) {
        client.wife.t5.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'Y20' : function(worksheet, cell, client) {
        client.wife.t5.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'R21' : function(worksheet, cell, client) {
        client.wife.otherIncome.value104 = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'R22' : function(worksheet, cell, client) {
        client.wife.otherIncome.value130 = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'V21' : function(worksheet, cell, client) {
        client.wife.t5Other.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'Y21' : function(worksheet, cell, client) {
        client.wife.t5Other.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'S23' : function(worksheet, cell, client) {
        client.wife.foreignIncome.div.currency = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'R23' : function(worksheet, cell, client) {
        client.wife.foreignIncome.div.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'R24' : function(worksheet, cell, client) {
        client.wife.foreignIncome.empl.currency = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'S24' : function(worksheet, cell, client) {
        client.wife.foreignIncome.empl.value = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'V24' : function(worksheet, cell, client) {
        client.wife.foreignIncome.country = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'V23' : function(worksheet, cell, client) {
        client.wife.t3.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'Y23' : function(worksheet, cell, client) {
        client.wife.t3.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'Y24' : function(worksheet, cell, client) {
        client.wife.t5007 = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'P25' : function(worksheet, cell, client) {
        client.wife.t4A = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'V25' : function(worksheet, cell, client) {
        client.wife.t5008.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'Y25' : function(worksheet, cell, client) {
        client.wife.t5008.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'P26' : function(worksheet, cell, client) {
        client.wife.t4AOAS = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'V26' : function(worksheet, cell, client) {
        client.wife.t5013.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'Y26' : function(worksheet, cell, client) {
        client.wife.t5013.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'P27' : function(worksheet, cell, client) {
        client.wife.t4AP.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'P28' : function(worksheet, cell, client) {
        client.wife.t4AP.split = !!worksheet[cell];
    },

    'V27' : function(worksheet, cell, client) {
        client.wife.rental.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'X27' : function(worksheet, cell, client) {
        client.wife.rental.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'Z27' : function(worksheet, cell, client) {
        client.wife.rental.gstReturn = !!worksheet[cell];
    },

    'P29' : function(worksheet, cell, client) {
        client.wife.t4E = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'V29' : function(worksheet, cell, client) {
        client.wife.selfEmployed.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'X29' : function(worksheet, cell, client) {
        client.wife.selfEmployed.joint = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'Z29' : function(worksheet, cell, client) {
        client.wife.selfEmployed.gstReturn = !!worksheet[cell];
    },

    'P31' : function(worksheet, cell, client) {
        client.wife.t4RSP = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'V31' : function(worksheet, cell, client) {
        client.wife.supportReceived = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'F33' : function(worksheet, cell, client) {
        client.wife.uccb = !!worksheet[cell];
    },

    'P36' : function(worksheet, cell, client) {
        client.wife.rrsp.value = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'T36' : function(worksheet, cell, client) {
        client.wife.rrsp.spouse = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'V36' : function(worksheet, cell, client) {
        client.wife.value777 = !!worksheet[cell];
    },

    'P37' : function(worksheet, cell, client) {
        client.wife.hbp = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'V37' : function(worksheet, cell, client) {
        client.wife.supportMade = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'L38' : function(worksheet, cell, client) {
        client.wife.moving = !!worksheet[cell];
    },

    'T38' : function(worksheet, cell, client) {
        client.wife.unionDue = !!worksheet[cell];
    },

    'Y38' : function(worksheet, cell, client) {
        client.wife.disabilitySupports = !!worksheet[cell];
    },

    'P41' : function(worksheet, cell, client) {
        client.wife.installation = (worksheet[cell] ? worksheet[cell].v : 0);
    },

    'L41' : function(worksheet, cell, client) {
        client.wife.tuition = !!worksheet[cell];
    },

    'Y41' : function(worksheet, cell, client) {
        client.wife.studentLoan = !!worksheet[cell];
    },

    'B38' : function(worksheet, cell, client) {
        client.carryingCharges = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'B39' : function(worksheet, cell, client) {
        client.childcare.name = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'I39' : function(worksheet, cell, client) {
        client.childcare.amount = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'P39' : function(worksheet, cell, client) {
        client.childcare.sin = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'B42' : function(worksheet, cell, client) {
        client.caregiver1.name = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'K42' : function(worksheet, cell, client) {
        client.caregiver1.amount = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'B43' : function(worksheet, cell, client) {
        client.caregiver2.name = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'K43' : function(worksheet, cell, client) {
        client.caregiver2.amount = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'B44' : function(worksheet, cell, client) {
        client.dependentTuition1.name = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'K44' : function(worksheet, cell, client) {
        client.dependentTuition1.amount = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'B45' : function(worksheet, cell, client) {
        client.dependentTuition2.name = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'K45' : function(worksheet, cell, client) {
        client.dependentTuition2.amount = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'V43' : function(worksheet, cell, client) {
        client.donation = !!worksheet[cell];
    },

    'P44' : function(worksheet, cell, client) {
        client.medExp = !!worksheet[cell];
    },

    'V44' : function(worksheet, cell, client) {
        client.hbtc = !!worksheet[cell];
    },

    'P45' : function(worksheet, cell, client) {
        client.disability = !!worksheet[cell];
    },

    'T45' : function(worksheet, cell, client) {
        client.t2201 = !!worksheet[cell];
    },

    'V45' : function(worksheet, cell, client) {
        client.equiv = !!worksheet[cell];
    },

    'A46' : function(worksheet, cell, client) {
        client.notes.one = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'A47' : function(worksheet, cell, client) {
        client.notes.two = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'A48' : function(worksheet, cell, client) {
        client.notes.three = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'B49' : function(worksheet, cell, client) {
        client.witb = !!worksheet[cell];
    },

    'B50' : function(worksheet, cell, client) {
        client.ctb = !!worksheet[cell];
    },

    'B51' : function(worksheet, cell, client) {
        client.gst = !!worksheet[cell];
    },

    'B52' : function(worksheet, cell, client) {
        client.prov = !!worksheet[cell];
    },

    'D49' : function(worksheet, cell, client) {
        client.comments.one = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'D51' : function(worksheet, cell, client) {
        client.comments.two = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'D53' : function(worksheet, cell, client) {
        client.comments.three = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'B55' : function(worksheet, cell, client) {
        client.msp = !!worksheet[cell];
    },

    'S55' : function(worksheet, cell, client) {
        client.consultFee = (worksheet[cell] ? worksheet[cell].v : '');
    },

    'V55' : function(worksheet, cell, client) {
        client.price = (worksheet[cell] ? worksheet[cell].v : '');
    }
};

function excelToClient(workbook) {
    var worksheet = workbook.Sheets['Interview Sheet'];

    var client = new Client();

    for (var cell in fields) {
        fields[cell](worksheet, cell, client);
    }

    client.fileName = clientNames.getFileName(client);
    client.pathName = clientNames.getPathName(client);

    client.save(function(err) {
        if (err) {
            console.log(client.fileName);
            console.log(err);
        }
    });
}

function readExcel(filepath) {
    var workbook = XLSX.readFile(filepath);
    excelToClient(workbook);
}

function readFolder(filepath) {
    fs.readdir(filepath, function(err, files) {
        var count = 0;
        files.forEach(function(file) {
            readExcel(filepath + '//' + file);
            count++;
        });
    })
}

module.exports = readFolder;