/**
 * Created by ander on 2017-05-09.
 */
var XLSX = require('xlsx');
var fs = require('fs');
var Client = require('../models/Client');
var clientNames = require('./utils/client');

var fields = {
    'H1' : function(cell, client) {
        client.year = (cell ? cell.v : '');
    },

    'P1' : function(cell, client) {
        client.interviewer = (cell ? cell.v : '');
    },

    'U1' : function(cell, client) {
        if (cell) client.prSold = cell.v == 'Y';
    },

    'X1' : function(cell, client) {
        client.pickupDate = (cell ? cell.v : '');
    },

    'D4' : function(cell, client) {
        client.husband.citizenship = !!cell;
    },

    'E4' : function(cell, client) {
        client.wife.citizenship = !!cell;
    },

    'I4' : function(cell, client) {
        client.husband.election = !!cell;
    },

    'L4' : function(cell, client) {
        client.wife.election = !!cell;
    },

    'P4' : function(cell, client) {
        client.preparer = (cell ? cell.v : '');
    },

    'V4' : function(cell, client) {
        client.checker = (cell ? cell.v : '');
    },

    'B7' : function(cell, client) {
        client.interviewDate = (cell ? cell.v : '');
    },

    'I7' : function(cell, client) {
        client.tel.check = false;
        client.tel.number = (cell ? cell.v : '');
    },

    'S7' : function(cell, client) {
        var temp = cell;
        if (temp) {
            var value = temp.v;
            if (value == '0') {
                client.t1135 = 'N';
            } else {
                client.t1135 = value.toUpperCase();
            }
        } else {
            client.t1135 = '';
        }
    },

    'V7' : function(cell, client) {
        client.stocks = !!cell;
    },

    'Y7' : function(cell, client) {
        client.t777 = !!cell;
    },

    'I8' : function(cell, client) {
        client.cell.check = false;
        client.cell.number = (cell ? cell.v : '');
    },

    'T8' : function(cell, client) {
        client.slips = !!cell;
    },

    'V8' : function(cell, client) {
        client.selfEmployed = !!cell;
    },

    'Y8' : function(cell, client) {
        client.rental = !!cell;
    },

    'Z8' : function(cell, client) {
        client.new = !!cell;
    },

    'D9' : function(cell, client) {
        client.email.check = false;
        client.email.value = (cell ? cell.v : '');
    },

    'S9' : function(cell, client) {
        client.group = (cell ? cell.v : '');
    },

    'V9' : function(cell, client) {
        client.numberOfReturns = (cell ? cell.v : '');
    },

    'D10' : function(cell, client) {
        var address;
        if (cell) {
            address = cell.v;
        } else {
            return;
        }

        var address_tokens = address.split(',');
        var units = address_tokens[0].split('-');

        if (address_tokens.length < 3) return;

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

    'W10' : function(cell, client) {
        client.husband.noa = !!cell;
    },

    'W11' : function(cell, client) {
        client.wife.noa = !!cell;
    },

    'Y10' : function(cell, client) {
        client.method = (cell ? cell.v.toUpperCase().trim() : '');
    },

    'B12' : function(cell, client) {
        client.husband.firstName = (cell ? cell.v : '');
    },

    'H12' : function(cell, client) {
        client.husband.lastName = (cell ? cell.v : '');
    },

    'P12' : function(cell, client) {
        client.wife.firstName = (cell ? cell.v : '');
    },

    'V12' : function(cell, client) {
        client.wife.lastName = (cell ? cell.v : '');
    },

    'B14' : function(cell, client) {
        client.husband.dateOfBirth = (cell ? cell.v : '');
    },

    'K14' : function(cell, client) {
        client.husband.departure = (cell ? cell.v : '');
    },

    'P14' : function(cell, client) {
        client.wife.dateOfBirth = (cell ? cell.v : '');
    },

    'X14' : function(cell, client) {
        client.wife.departure = (cell ? cell.v : '');
    },

    'B15' : function(cell, client) {
        client.husband.sin = (cell ? cell.v : '');
    },

    'H15' : function(cell, client) {
        client.husband.status = (cell ? cell.v : '');
    },

    'P15' : function(cell, client) {
        client.wife.sin = (cell ? cell.v : '');
    },

    'V15' : function(cell, client) {
        client.wife.status = (cell ? cell.v : '');
    },

    'E16' : function(cell, client) {
        client.dependent1.name = (cell ? cell.v : '');
    },

    'L16' : function(cell, client) {
        client.dependent1.relationship = (cell ? cell.v : '');
    },

    'M16' : function(cell, client) {
        client.dependent2.name = (cell ? cell.v : '');
    },

    'T16' : function(cell, client) {
        client.dependent2.relationship = (cell ? cell.v : '');
    },

    'U16' : function(cell, client) {
        client.dependent3.name = (cell ? cell.v : '');
    },

    'Z16' : function(cell, client) {
        client.dependent3.relationship = (cell ? cell.v : '');
    },

    'E17' : function(cell, client) {
        client.dependent1.dateOfBirth = (cell ? cell.v : '');
    },

    'M17' : function(cell, client) {
        client.dependent2.dateOfBirth = (cell ? cell.v : '');
    },

    'U17' : function(cell, client) {
        client.dependent3.dateOfBirth = (cell ? cell.v : '');
    },

    'E18' : function(cell, client) {
        client.dependent1.sin = (cell ? cell.v : '');
    },

    'M18' : function(cell, client) {
        client.dependent2.sin = (cell ? cell.v : '');
    },

    'U18' : function(cell, client) {
        client.dependent3.sin = (cell ? cell.v : '');
    },

    'B20' : function(cell, client) {
        client.husband.t4 = !!cell
    },

    'H20' : function(cell, client) {
        client.husband.t5.value = !!cell
    },

    'L20' : function(cell, client) {
        client.husband.t5.joint = !!cell
    },

    'D21' : function(cell, client) {
        client.husband.otherIncome.value104 = (cell ? cell.v : '');
    },

    'D22' : function(cell, client) {
        client.husband.otherIncome.value130 = (cell ? cell.v : '');
    },

    'H21' : function(cell, client) {
        client.husband.t5Other.value = !!cell
    },

    'L21' : function(cell, client) {
        client.husband.t5Other.joint = !!cell
    },

    'D23' : function(cell, client) {
        client.husband.foreignIncome.div.currency = (cell ? cell.v : '');
    },

    'E23' : function(cell, client) {
        client.husband.foreignIncome.div.value = (cell ? cell.v : '');
    },

    'D24' : function(cell, client) {
        client.husband.foreignIncome.empl.currency = (cell ? cell.v : '');
    },

    'E24' : function(cell, client) {
        client.husband.foreignIncome.empl.value = (cell ? cell.v : '');
    },

    'H24' : function(cell, client) {
        client.husband.foreignIncome.country = (cell ? cell.v : '');
    },

    'H23' : function(cell, client) {
        client.husband.t3.value = !!cell
    },

    'L23' : function(cell, client) {
        client.husband.t3.joint = !!cell
    },

    'L24' : function(cell, client) {
        client.husband.t5007 = !!cell
    },

    'B25' : function(cell, client) {
        client.husband.t4A = !!cell
    },

    'H25' : function(cell, client) {
        client.husband.t5008.value = !!cell
    },

    'L25' : function(cell, client) {
        client.husband.t5008.joint = !!cell
    },

    'B26' : function(cell, client) {
        client.husband.t4AOAS = !!cell
    },

    'H26' : function(cell, client) {
        client.husband.t5013.value = !!cell
    },

    'L26' : function(cell, client) {
        client.husband.t5013.joint = !!cell
    },

    'B27' : function(cell, client) {
        client.husband.t4AP.value = !!cell
    },

    'B28' : function(cell, client) {
        client.husband.t4AP.split = !!cell;
    },

    'H27' : function(cell, client) {
        client.husband.rental.value = (cell ? cell.v : '');
    },

    'K27' : function(cell, client) {
        client.husband.rental.joint = (cell ? cell.v : '');
    },

    'M27' : function(cell, client) {
        client.husband.rental.gstReturn = !!cell;
    },

    'B29' : function(cell, client) {
        client.husband.t4E = !!cell
    },

    'H29' : function(cell, client) {
        client.husband.selfEmployed.value = (cell ? cell.v : '');
    },

    'K29' : function(cell, client) {
        client.husband.selfEmployed.joint = (cell ? cell.v : '');
    },

    'M29' : function(cell, client) {
        client.husband.selfEmployed.gstReturn = !!cell;
    },

    'B31' : function(cell, client) {
        client.husband.t4RSP = !!cell
    },

    'H31' : function(cell, client) {
        client.husband.supportReceived = (cell ? cell.v : '');
    },

    'D33' : function(cell, client) {
        client.husband.uccb = !!cell;
    },

    'B36' : function(cell, client) {
        client.husband.rrsp.value = !!cell
    },

    'F36' : function(cell, client) {
        client.husband.rrsp.spouse = !!cell
    },

    'H36' : function(cell, client) {
        client.husband.value777 = !!cell;
    },

    'B37' : function(cell, client) {
        client.husband.hbp = !!cell
    },

    'H37' : function(cell, client) {
        client.husband.supportMade = (cell ? cell.v : '');
    },

    'I38' : function(cell, client) {
        client.husband.moving = !!cell;
    },

    'R38' : function(cell, client) {
        client.husband.unionDue = !!cell;
    },

    'W38' : function(cell, client) {
        client.husband.disabilitySupports = !!cell;
    },

    'B41' : function(cell, client) {
        client.husband.installation = (cell ? cell.v : '');
    },

    'I41' : function(cell, client) {
        client.husband.tuition = !!cell;
    },

    'W41' : function(cell, client) {
        client.husband.studentLoan = !!cell;
    },

    'P20' : function(cell, client) {
        client.wife.t4 = !!cell
    },

    'V20' : function(cell, client) {
        client.wife.t5.value = !!cell
    },

    'Y20' : function(cell, client) {
        client.wife.t5.joint = !!cell
    },

    'R21' : function(cell, client) {
        client.wife.otherIncome.value104 = (cell ? cell.v : '');
    },

    'R22' : function(cell, client) {
        client.wife.otherIncome.value130 = (cell ? cell.v : '');
    },

    'V21' : function(cell, client) {
        client.wife.t5Other.value = !!cell
    },

    'Y21' : function(cell, client) {
        client.wife.t5Other.joint = !!cell
    },

    'R23' : function(cell, client) {
        client.wife.foreignIncome.div.currency = (cell ? cell.v : '');
    },

    'S23' : function(cell, client) {
        client.wife.foreignIncome.div.value = (cell ? cell.v : '');
    },

    'R24' : function(cell, client) {
        client.wife.foreignIncome.empl.currency = (cell ? cell.v : '');
    },

    'S24' : function(cell, client) {
        client.wife.foreignIncome.empl.value = (cell ? cell.v : '');
    },

    'V24' : function(cell, client) {
        client.wife.foreignIncome.country = (cell ? cell.v : '');
    },

    'V23' : function(cell, client) {
        client.wife.t3.value = !!cell
    },

    'Y23' : function(cell, client) {
        client.wife.t3.joint = !!cell
    },

    'Y24' : function(cell, client) {
        client.wife.t5007 = !!cell
    },

    'P25' : function(cell, client) {
        client.wife.t4A = !!cell
    },

    'V25' : function(cell, client) {
        client.wife.t5008.value = !!cell
    },

    'Y25' : function(cell, client) {
        client.wife.t5008.joint = !!cell
    },

    'P26' : function(cell, client) {
        client.wife.t4AOAS = !!cell
    },

    'V26' : function(cell, client) {
        client.wife.t5013.value = !!cell
    },

    'Y26' : function(cell, client) {
        client.wife.t5013.joint = !!cell
    },

    'P27' : function(cell, client) {
        client.wife.t4AP.value = !!cell
    },

    'P28' : function(cell, client) {
        client.wife.t4AP.split = !!cell;
    },

    'V27' : function(cell, client) {
        client.wife.rental.value = (cell ? cell.v : '');
    },

    'X27' : function(cell, client) {
        client.wife.rental.joint = (cell ? cell.v : '');
    },

    'Z27' : function(cell, client) {
        client.wife.rental.gstReturn = !!cell;
    },

    'P29' : function(cell, client) {
        client.wife.t4E = !!cell
    },

    'V29' : function(cell, client) {
        client.wife.selfEmployed.value = (cell ? cell.v : '');
    },

    'X29' : function(cell, client) {
        client.wife.selfEmployed.joint = (cell ? cell.v : '');
    },

    'Z29' : function(cell, client) {
        client.wife.selfEmployed.gstReturn = !!cell;
    },

    'P31' : function(cell, client) {
        client.wife.t4RSP = !!cell
    },

    'V31' : function(cell, client) {
        client.wife.supportReceived = (cell ? cell.v : '');
    },

    'F33' : function(cell, client) {
        client.wife.uccb = !!cell;
    },

    'P36' : function(cell, client) {
        client.wife.rrsp.value = !!cell
    },

    'T36' : function(cell, client) {
        client.wife.rrsp.spouse = !!cell
    },

    'V36' : function(cell, client) {
        client.wife.value777 = !!cell;
    },

    'P37' : function(cell, client) {
        client.wife.hbp = !!cell
    },

    'V37' : function(cell, client) {
        client.wife.supportMade = (cell ? cell.v : '');
    },

    'L38' : function(cell, client) {
        client.wife.moving = !!cell;
    },

    'T38' : function(cell, client) {
        client.wife.unionDue = !!cell;
    },

    'Y38' : function(cell, client) {
        client.wife.disabilitySupports = !!cell;
    },

    'P41' : function(cell, client) {
        client.wife.installation = (cell ? cell.v : '');
    },

    'L41' : function(cell, client) {
        client.wife.tuition = !!cell;
    },

    'Y41' : function(cell, client) {
        client.wife.studentLoan = !!cell;
    },

    'B38' : function(cell, client) {
        client.carryingCharges = (cell ? cell.v : '');
    },

    'B39' : function(cell, client) {
        client.childcare.name = (cell ? cell.v : '');
    },

    'I39' : function(cell, client) {
        client.childcare.amount = (cell ? cell.v : '');
    },

    'P39' : function(cell, client) {
        client.childcare.sin = (cell ? cell.v : '');
    },

    'B42' : function(cell, client) {
        client.caregiver1.name = (cell ? cell.v : '');
    },

    'K42' : function(cell, client) {
        client.caregiver1.amount = (cell ? cell.v : '');
    },

    'B43' : function(cell, client) {
        client.caregiver2.name = (cell ? cell.v : '');
    },

    'K43' : function(cell, client) {
        client.caregiver2.amount = (cell ? cell.v : '');
    },

    'B44' : function(cell, client) {
        client.dependentTuition1.name = (cell ? cell.v : '');
    },

    'K44' : function(cell, client) {
        client.dependentTuition1.amount = (cell ? cell.v : '');
    },

    'B45' : function(cell, client) {
        client.dependentTuition2.name = (cell ? cell.v : '');
    },

    'K45' : function(cell, client) {
        client.dependentTuition2.amount = (cell ? cell.v : '');
    },

    'V43' : function(cell, client) {
        client.donation = !!cell;
    },

    'P44' : function(cell, client) {
        client.medExp = !!cell;
    },

    'V44' : function(cell, client) {
        client.hbtc = !!cell;
    },

    'P45' : function(cell, client) {
        client.disability = !!cell;
    },

    'T45' : function(cell, client) {
        client.t2201 = !!cell;
    },

    'V45' : function(cell, client) {
        client.equiv = !!cell;
    },

    'A46' : function(cell, client) {
        client.notes.one = (cell ? cell.v : '');
    },

    'A47' : function(cell, client) {
        client.notes.two = (cell ? cell.v : '');
    },

    'A48' : function(cell, client) {
        client.notes.three = (cell ? cell.v : '');
    },

    'B49' : function(cell, client) {
        client.witb = !!cell;
    },

    'B50' : function(cell, client) {
        client.ctb = !!cell;
    },

    'B51' : function(cell, client) {
        client.gst = !!cell;
    },

    'B52' : function(cell, client) {
        client.prov = !!cell;
    },

    'D49' : function(cell, client) {
        client.comments.one = (cell ? cell.v : '');
    },

    'D51' : function(cell, client) {
        client.comments.two = (cell ? cell.v : '');
    },

    'D53' : function(cell, client) {
        client.comments.three = (cell ? cell.v : '');
    },

    'B55' : function(cell, client) {
        client.msp = !!cell;
    },

    'S55' : function(cell, client) {
        client.consultFee = (cell ? cell.v : '');
    },

    'V55' : function(cell, client) {
        client.price = (cell ? cell.v : '');
    }
};

function excelToClient(workbook) {
    var worksheet = workbook.Sheets['Interview Sheet'];

    var client = new Client();

    for (var cell in fields) {
        if (worksheet[cell] && worksheet[cell].t == 's') {
            worksheet[cell].v = worksheet[cell].v.trim();
        }
        fields[cell](worksheet[cell], client);
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
    console.log(filepath);
    var workbook = XLSX.readFile(filepath);
    excelToClient(workbook);
}

function readFolder(filepath, callback) {
    fs.readdir(filepath, function(err, files) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].split('.')[1] != 'xlsx') continue;
            readExcel(filepath + '//' + files[i]);
        }
    });
    callback();
}

module.exports = readFolder;