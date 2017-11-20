/**
 * Created by ander on 2017-10-25.
 */
/**
 * Created by ander on 2017-05-09.
 */
var XLSX = require('xlsx-populate');
var ConfigService = require('./config');
var fs = require('fs');

var fields = {
    'general' : {
        'H1' : function(cell, client) {
            cell.value(client.year);
        },

        'P1' : function(cell, client) {
            cell.value(client.interviewer);
        },

        'X1' : function(cell, client) {
            cell.value(client.pickupDate);
        },

        'P4' : function(cell, client) {
            cell.value(client.preparer);
        },

        'V4' : function(cell, client) {
            cell.value(client.checker);
        },

        'B7' : function(cell, client) {
            cell.value(client.interviewDate);
        },

        'H7' : function(cell, client) {
            cell.value(client.tel.check ? 'N' : 'O');
        },

        'I7' : function(cell, client) {
            cell.value(client.tel.number);
        },

        'S7' : function(cell, client) {
            cell.value(client.t1135);
        },

        'V7' : function(cell, client) {
            cell.value(client.stocks ? 'Y' : '');
        },

        'Y7' : function(cell, client) {
            cell.value(client.t777 ? 'Y' : '');
        },

        'H8' : function(cell, client) {
            cell.value(client.cell.check ? 'N' : 'O');
        },

        'I8' : function(cell, client) {
            cell.value(client.cell.number);
        },

        'T8' : function(cell, client) {
            cell.value(client.slips ? 'Y' : '');
        },

        'V8' : function(cell, client) {
            cell.value(client.selfEmployed ? 'Y' : '');
        },

        'Y8' : function(cell, client) {
            cell.value(client.rental ? 'Y' : '');
        },

        'Z8' : function(cell, client) {
            cell.value(client.new ? 'Y' : '');
        },

        'B9' : function(cell, client) {
            cell.value(client.email.check ? 'N' : 'O');
        },

        'D9' : function(cell, client) {
            cell.value(client.email.value);
        },

        'S9' : function(cell, client) {
            cell.value(client.group);
        },

        'V9' : function(cell, client) {
            cell.value(client.numberOfReturns);
        },

        'B10' : function(cell, client) {
            cell.value(client.address.check ? 'N' : 'O');
        },

        'D10' : function(cell, client) {
            var address = '';
            address += client.address.apartment;
            address += '-' + client.address.street;
            address += ', ' + client.address.city;
            address += ', ' + client.address.province;
            address += ' ' + client.address.postalCode;

            cell.value(address);
        },

        'Y10' : function(cell, client) {
            cell.value(client.method);
        },

        'E16' : function(cell, client) {
            cell.value(client.dependent1.name);
        },

        'L16' : function(cell, client) {
            cell.value(client.dependent1.relationship);
        },

        'M16' : function(cell, client) {
            cell.value(client.dependent2.name);
        },

        'T16' : function(cell, client) {
            cell.value(client.dependent2.relationship);
        },

        'U16' : function(cell, client) {
            cell.value(client.dependent3.name);
        },

        'Z16' : function(cell, client) {
            cell.value(client.dependent3.relationship);
        },

        'E17' : function(cell, client) {
            cell.value(client.dependent1.dateOfBirth);
        },

        'M17' : function(cell, client) {
            cell.value(client.dependent2.dateOfBirth);
        },

        'U17' : function(cell, client) {
            cell.value(client.dependent3.dateOfBirth);
        },

        'E18' : function(cell, client) {
            cell.value(client.dependent1.sin);
        },

        'M18' : function(cell, client) {
            cell.value(client.dependent2.sin);
        },

        'U18' : function(cell, client) {
            cell.value(client.dependent3.sin);
        },

        'B38' : function(cell, client) {
            cell.value(client.carryingCharges ? 'Y' : '');
        },

        'B39' : function(cell, client) {
            cell.value(client.childcare.name);
        },

        'I39' : function(cell, client) {
            cell.value(client.childcare.amount);
        },

        'P39' : function(cell, client) {
            cell.value(client.childcare.sin);
        },

        'B42' : function(cell, client) {
            cell.value(client.caregiver1.name);
        },

        'K42' : function(cell, client) {
            cell.value(client.caregiver1.amount);
        },

        'B43' : function(cell, client) {
            cell.value(client.caregiver2.name);
        },

        'K43' : function(cell, client) {
            cell.value(client.caregiver2.amount);
        },

        'B44' : function(cell, client) {
            cell.value(client.dependentTuition1.name);
        },

        'K44' : function(cell, client) {
            cell.value(client.dependentTuition1.amount);
        },

        'B45' : function(cell, client) {
            cell.value(client.dependentTuition2.name);
        },

        'K45' : function(cell, client) {
            cell.value(client.dependentTuition2.amount);
        },

        'V43' : function(cell, client) {
            cell.value(client.donation ? 'Y' : '');
        },

        'P44' : function(cell, client) {
            cell.value(client.medExp ? 'Y' : '');
        },

        'V44' : function(cell, client) {
            cell.value(client.hbtc ? 'Y' : '');
        },

        'P45' : function(cell, client) {
            cell.value(client.disability ? 'Y' : '');
        },

        'T45' : function(cell, client) {
            cell.value(client.t2201 ? 'Y' : '');
        },

        'V45' : function(cell, client) {
            cell.value(client.equiv ? 'Y' : '');
        },

        'A46' : function(cell, client) {
            cell.value(client.notes.one);
        },

        'A47' : function(cell, client) {
            cell.value(client.notes.two);
        },

        'A48' : function(cell, client) {
            cell.value(client.notes.three);
        },

        'B49' : function(cell, client) {
            cell.value(client.witb ? 'Y' : '');
        },

        'B50' : function(cell, client) {
            cell.value(client.ctb ? 'Y' : '');
        },

        'B51' : function(cell, client) {
            cell.value(client.gst ? 'Y' : '');
        },

        'B52' : function(cell, client) {
            cell.value(client.prov ? 'Y' : '');
        },

        'D49' : function(cell, client) {
            cell.value(client.comments.one);
        },

        'D51' : function(cell, client) {
            cell.value(client.comments.two);
        },

        'D53' : function(cell, client) {
            cell.value(client.comments.three);
        },

        'B55' : function(cell, client) {
            console.log('client msp: ' + client.msp);
            cell.value(client.msp ? 'Y' : '');
        },

        'S55' : function(cell, client) {
            cell.value(client.consultFee);
        },

        'V55' : function(cell, client) {
            cell.value(client.price);
        }

    },

    'husband' : {
        'D4' : function(cell, client) {
            cell.value(client.husband.citizenship ? 'Y' : '');
        },

        'I4' : function(cell, client) {
            cell.value(client.husband.election ? 'Y' : '');
        },

        'W10' : function(cell, client) {
            cell.value(client.husband.noa ? 'Y' : '');
        },

        'B12' : function(cell, client) {
            cell.value(client.husband.firstName);
        },

        'H12' : function(cell, client) {
            cell.value(client.husband.lastName);
        },

        'B14' : function(cell, client) {
            cell.value(client.husband.dateOfBirth);
        },

        'K14' : function(cell, client) {
            cell.value(client.husband.departure);
        },

        'B15' : function(cell, client) {
            cell.value(client.husband.sin);
        },

        'H15' : function(cell, client) {
            cell.value(client.husband.status);
        },

        'B20' : function(cell, client) {
            cell.value(client.husband.t4 ? 'Y' : '');
        },

        'H20' : function(cell, client) {
            cell.value(client.husband.t5.value ? 'Y' : '');
        },

        'L20' : function(cell, client) {
            cell.value(client.husband.t5.joint ? 'Y' : '');
        },

        'D21' : function(cell, client) {
            cell.value(client.husband.otherIncome.value104);
        },

        'D22' : function(cell, client) {
            cell.value(client.husband.otherIncome.value130);
        },

        'H21' : function(cell, client) {
            cell.value(client.husband.t5Other.value ? 'Y' : '');
        },

        'L21' : function(cell, client) {
            cell.value(client.husband.t5Other.joint ? 'Y' : '');
        },

        'D23' : function(cell, client) {
            cell.value(client.husband.foreignIncome.div.currency);
        },

        'E23' : function(cell, client) {
            cell.value(client.husband.foreignIncome.div.value);
        },

        'D24' : function(cell, client) {
            cell.value(client.husband.foreignIncome.empl.currency);
        },

        'E24' : function(cell, client) {
            cell.value(client.husband.foreignIncome.empl.value);
        },

        'H24' : function(cell, client) {
            cell.value(client.husband.foreignIncome.country);
        },

        'H23' : function(cell, client) {
            cell.value(client.husband.t3.value ? 'Y' : '');
        },

        'L23' : function(cell, client) {
            cell.value(client.husband.t3.joint ? 'Y' : '');
        },

        'L24' : function(cell, client) {
            cell.value(client.husband.t5007 ? 'Y' : '');
        },

        'B25' : function(cell, client) {
            cell.value(client.husband.t4A ? 'Y' : '');
        },

        'H25' : function(cell, client) {
            cell.value(client.husband.t5008.value ? 'Y' : '');
        },

        'L25' : function(cell, client) {
            cell.value(client.husband.t5008.joint ? 'Y' : '');
        },

        'B26' : function(cell, client) {
            cell.value(client.husband.t4AOAS ? 'Y' : '');
        },

        'H26' : function(cell, client) {
            cell.value(client.husband.t5013.value ? 'Y' : '');
        },

        'L26' : function(cell, client) {
            cell.value(client.husband.t5013.joint ? 'Y' : '');
        },

        'B27' : function(cell, client) {
            cell.value(client.husband.t4AP.value ? 'Y' : '');
        },

        'B28' : function(cell, client) {
            cell.value(client.husband.t4AP.split ? 'Y' : '');
        },

        'H27' : function(cell, client) {
            cell.value(client.husband.rental.value);
        },

        'K27' : function(cell, client) {
            cell.value(client.husband.rental.joint);
        },

        'M27' : function(cell, client) {
            cell.value(client.husband.rental.gstReturn ? 'Y' : '');
        },

        'B29' : function(cell, client) {
            cell.value(client.husband.t4E ? 'Y' : '');
        },

        'H29' : function(cell, client) {
            cell.value(client.husband.selfEmployed.value);
        },

        'K29' : function(cell, client) {
            cell.value(client.husband.selfEmployed.joint);
        },

        'M29' : function(cell, client) {
            cell.value(client.husband.selfEmployed.gstReturn ? 'Y' : '');
        },

        'B31' : function(cell, client) {
            cell.value(client.husband.t4RSP ? 'Y' : '');
        },

        'H31' : function(cell, client) {
            cell.value(client.husband.supportReceived);
        },

        'D33' : function(cell, client) {
            cell.value(client.husband.uccb ? 'Y' : '');
        },

        'B36' : function(cell, client) {
            cell.value(client.husband.rrsp.value ? 'Y' : '');
        },

        'F36' : function(cell, client) {
            cell.value(client.husband.rrsp.spouse ? 'Y' : '');
        },

        'H36' : function(cell, client) {
            cell.value(client.husband.value777 ? 'Y' : '');
        },

        'B37' : function(cell, client) {
            cell.value(client.husband.hbp ? 'Y' : '');
        },

        'H37' : function(cell, client) {
            cell.value(client.husband.supportMade);
        },

        'I38' : function(cell, client) {
            cell.value(client.husband.moving ? 'Y' : '');
        },

        'R38' : function(cell, client) {
            cell.value(client.husband.unionDue ? 'Y' : '');
        },

        'W38' : function(cell, client) {
            cell.value(client.husband.disabilitySupports ? 'Y' : '');
        },

        'B41' : function(cell, client) {
            cell.value(client.husband.installation);
        },

        'I41' : function(cell, client) {
            cell.value(client.husband.tuition ? 'Y' : '');
        },

        'W41' : function(cell, client) {
            cell.value(client.husband.studentLoan ? 'Y' : '');
        }
    },

    'wife' : {
        'E4' : function(cell, client) {
            cell.value(client.wife.citizenship ? 'Y' : '');
        },

        'L4' : function(cell, client) {
            cell.value(client.wife.election ? 'Y' : '');
        },

        'W11' : function(cell, client) {
            cell.value(client.wife.noa ? 'Y' : '');
        },

        'P12' : function(cell, client) {
            cell.value(client.wife.firstName);
        },

        'V12' : function(cell, client) {
            cell.value(client.wife.lastName);
        },

        'P14' : function(cell, client) {
            cell.value(client.wife.dateOfBirth);
        },

        'X14' : function(cell, client) {
            cell.value(client.wife.departure);
        },

        'P15' : function(cell, client) {
            cell.value(client.wife.sin);
        },

        'V15' : function(cell, client) {
            cell.value(client.wife.status);
        },

        'P20' : function(cell, client) {
            cell.value(client.wife.t4 ? 'Y' : '');
        },

        'V20' : function(cell, client) {
            cell.value(client.wife.t5.value ? 'Y' : '');
        },

        'Y20' : function(cell, client) {
            cell.value(client.wife.t5.joint ? 'Y' : '');
        },

        'R21' : function(cell, client) {
            cell.value(client.wife.otherIncome.value104);
        },

        'R22' : function(cell, client) {
            cell.value(client.wife.otherIncome.value130);
        },

        'V21' : function(cell, client) {
            cell.value(client.wife.t5Other.value ? 'Y' : '');
        },

        'Y21' : function(cell, client) {
            cell.value(client.wife.t5Other.joint ? 'Y' : '');
        },

        'R23' : function(cell, client) {
            cell.value(client.wife.foreignIncome.div.currency);
        },

        'S23' : function(cell, client) {
            cell.value(client.wife.foreignIncome.div.value);
        },

        'R24' : function(cell, client) {
            cell.value(client.wife.foreignIncome.empl.currency);
        },

        'S24' : function(cell, client) {
            cell.value(client.wife.foreignIncome.empl.value);
        },

        'V24' : function(cell, client) {
            cell.value(client.wife.foreignIncome.country);
        },

        'V23' : function(cell, client) {
            cell.value(client.wife.t3.value ? 'Y' : '');
        },

        'Y23' : function(cell, client) {
            cell.value(client.wife.t3.joint ? 'Y' : '');
        },

        'Y24' : function(cell, client) {
            cell.value(client.wife.t5007 ? 'Y' : '');
        },

        'P25' : function(cell, client) {
            cell.value(client.wife.t4A ? 'Y' : '');
        },

        'V25' : function(cell, client) {
            cell.value(client.wife.t5008.value ? 'Y' : '');
        },

        'Y25' : function(cell, client) {
            cell.value(client.wife.t5008.joint ? 'Y' : '');
        },

        'P26' : function(cell, client) {
            cell.value(client.wife.t4AOAS ? 'Y' : '');
        },

        'V26' : function(cell, client) {
            cell.value(client.wife.t5013.value ? 'Y' : '');
        },

        'Y26' : function(cell, client) {
            cell.value(client.wife.t5013.joint ? 'Y' : '');
        },

        'P27' : function(cell, client) {
            cell.value(client.wife.t4AP.value ? 'Y' : '');
        },

        'P28' : function(cell, client) {
            cell.value(client.wife.t4AP.split ? 'Y' : '');
        },

        'V27' : function(cell, client) {
            cell.value(client.wife.rental.value);
        },

        'X27' : function(cell, client) {
            cell.value(client.wife.rental.joint);
        },

        'Z27' : function(cell, client) {
            cell.value(client.wife.rental.gstReturn ? 'Y' : '');
        },

        'P29' : function(cell, client) {
            cell.value(client.wife.t4E ? 'Y' : '');
        },

        'V29' : function(cell, client) {
            cell.value(client.wife.selfEmployed.value);
        },

        'X29' : function(cell, client) {
            cell.value(client.wife.selfEmployed.joint);
        },

        'Z29' : function(cell, client) {
            cell.value(client.wife.selfEmployed.gstReturn ? 'Y' : '');
        },

        'P31' : function(cell, client) {
            cell.value(client.wife.t4RSP ? 'Y' : '');
        },

        'V31' : function(cell, client) {
            cell.value(client.wife.supportReceived);
        },

        'F33' : function(cell, client) {
            cell.value(client.wife.uccb ? 'Y' : '');
        },

        'P36' : function(cell, client) {
            cell.value(client.wife.rrsp.value ? 'Y' : '');
        },

        'T36' : function(cell, client) {
            cell.value(client.wife.rrsp.spouse ? 'Y' : '');
        },

        'V36' : function(cell, client) {
            cell.value(client.wife.value777 ? 'Y' : '');
        },

        'P37' : function(cell, client) {
            cell.value(client.wife.hbp ? 'Y' : '');
        },

        'V37' : function(cell, client) {
            cell.value(client.wife.supportMade);
        },

        'L38' : function(cell, client) {
            cell.value(client.wife.moving ? 'Y' : '');
        },

        'T38' : function(cell, client) {
            cell.value(client.wife.unionDue ? 'Y' : '');
        },

        'Y38' : function(cell, client) {
            cell.value(client.wife.disabilitySupports ? 'Y' : '');
        },

        'P41' : function(cell, client) {
            cell.value(client.wife.installation);
        },

        'L41' : function(cell, client) {
            cell.value(client.wife.tuition ? 'Y' : '');
        },

        'Y41' : function(cell, client) {
            cell.value(client.wife.studentLoan ? 'Y' : '');
        }
    }
};

function clientToExcel(filepath, year, client) {
    var path = filepath + '//' + year + '//' + client.fileName + '.xlsx';
    if (!fs.existsSync(filepath)) {
        path = 'C://Users//ander//Desktop//BLCL Files//Templates/1- T1 INTERVIEW-New.xlsx';
    }
    XLSX.fromFileAsync(path).then(function(workbook) {
        for (var section in fields) {
            if (section == 'husband') if (!client.husband) continue;
            if (section == 'wife') if (!client.wife) continue;

            for (var cell in fields[section]) {
                fields[section][cell](workbook.sheet('Interview Sheet').cell(cell), client);
            }
        }
        filepath = filepath + '//' + client.year;
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath);
        }
        return workbook.toFileAsync(filepath + '//' + client.fileName + '.xlsx');
    });
}

module.exports = clientToExcel;