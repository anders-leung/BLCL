/**
 * Created by ander on 2017-12-17.
 */
const fills = {
    husband: {
        fill: 'ffd966',
        cells: ['C4', 'H4', 'G8', 'V10', 'E20', 'J20', 'L20', 'S20', 'W20', 'Y20', 'K21',
            'X21', 'K22', 'X22', 'K23', 'X23', 'E25', 'K25', 'S25', 'X25', 'D27', 'J27', 'R27', 'W27',
            'J28', 'W28', 'J29', 'W29', 'J30', 'W30', 'B33', 'E36', 'S36', 'H38', 'P38', 'V38', 'H41', 'V41']
    },
    wife: {
        fill: 'ffff00',
        cells: ['V1', 'W1', 'E4', 'K4', 'S7', 'L8', 'V11', 'E33', 'E34', 'K38', 'S38', 'X38', 'K41', 'X41']
    },
    light: {
        fill: 'fff2cc',
        cells: ['S1', 'T1', 'O7', 'U7', 'W7', 'X7', 'P8', 'Q8', 'R8', 'S8', 'U8', 'W8', 'X8',
            'P9', 'Q9', 'R9', 'U9']
    },
    blue: {
        fill: '9bc2e6',
        cells: ['Z7']
    }
};

function unmergeAll(range, sheet) {
    range = sheet.range(range).merged(false);
    var addresses = [];
    range.map((cell, ri, ci, range) => {
        addresses.push(cell.address());
    });

    var ranges = [];
    for (var i = 0; i < addresses.length; i++) {
        for (var j = i; j < addresses.length; j++) {
            if (j == i) continue;
            ranges.push(addresses[i] + ':' + addresses[j]);
        }
    }
    for (var k = 0; k < ranges.length; k++) {
        sheet.range(ranges[k]).merged(false);
    }
}

function setInputStyle(object, border) {
    var styles = {
        'bold': true,
        'shrinkToFit': true,
        'horizontalAlignment': 'center'
    };
    if (border) styles.border = true;
    object.style(styles);
}

function setLabelStyle(object, border, bold) {
    var styles = {
        'bold': false,
        'shrinkToFit': true,
        'horizontalAlignment': 'left',
        'wrapText': true
    };
    if (border) styles.border = true;
    if (bold) styles.bold = true;
    object.style(styles);
}

function updateHusbandT4(sheet) {
    var range = sheet.range('B20:F20');
    if (range.merged()) {
        range.merged(false);
        range = sheet.range('B20:D20');
        range.merged(true);
        setInputStyle(range);
        var cell = sheet.cell('B20');
        cell.value('');

        cell = sheet.cell('E20');
        setLabelStyle(cell);
        cell.style({
            shrinkToFit: false,
            fontSize: 9
        });
        cell.value('BLCL');

        cell = sheet.cell('F20');
        setLabelStyle(cell);
        cell.value('');
    }
}

function updateHusbandT5(sheet) {
    var range = sheet.range('H20:J20');
    if (range.merged()) {
        range.merged(false);
        range = sheet.range('H20:I20');
        range.merged(true);
        setInputStyle(range);
        var cell = sheet.cell('H20');
        cell.value('');

        cell = sheet.cell('J20');
        setLabelStyle(cell);
        cell.style({
            'horizontalAlignment': 'center',
            'fontSize': 11
        });
        cell.value('JT');

        cell = sheet.cell('K20');
        setInputStyle(cell);
        cell.style('fontSize', 18);
        cell.value('');

        range = sheet.range('L20:M20');
        range.merged(false);

        cell = sheet.cell('L20');
        setLabelStyle(cell);
        cell.style({
            shrinkToFit: false,
            fontSize: 9
        });
        cell.value('BLCL');

        cell = sheet.cell('M20');
        setInputStyle(cell);
        cell.value('');
    }
}

function updateHusbandT4A(sheet) {
    var range = sheet.range('B25:F25');
    if (range.merged()) {
        range.merged(false);
        range = sheet.range('B25:D25');
        range.merged(true);
        setInputStyle(range);
        var cell = sheet.cell('B25');
        cell.value('');

        cell = sheet.cell('E25');
        setLabelStyle(cell);
        cell.style({
            shrinkToFit: false,
            fontSize: 9
        });
        cell.value('BLCL');

        cell = sheet.cell('F25');
        setLabelStyle(cell);
        cell.value('');
    }
}

function updateWifeT4(sheet) {
    var range = sheet.range('P20:T20');
    if (range.merged()) {
        range.merged(false);
        range = sheet.range('P20:R20');
        range.merged(true);
        setInputStyle(range);
        var cell = sheet.cell('P20');
        cell.value('');

        cell = sheet.cell('S20');
        setLabelStyle(cell);
        cell.style({
            shrinkToFit: false,
            fontSize: 9
        });
        cell.value('BLCL');

        cell = sheet.cell('T20');
        setLabelStyle(cell);
        cell.value('');
    }
}

function updateWifeT5(sheet) {
    var range = sheet.range('V20:W20');
    if (range.merged()) {
        range.merged(false);
        var cell = sheet.cell('V20');
        setInputStyle(cell);
        cell.value('');

        cell = sheet.cell('W20');
        setLabelStyle(cell);
        cell.style({
            'horizontalAlignment': 'center',
            'fontSize': 11
        });
        cell.value('JT');

        cell = sheet.cell('X20');
        setInputStyle(cell);
        cell.style('fontSize', 18);
        cell.value('');

        range = sheet.range('Y20:Z20');
        range.merged(false);

        cell = sheet.cell('Y20');
        setLabelStyle(cell);
        cell.style({
            shrinkToFit: false,
            fontSize: 9
        });
        cell.value('BLCL');

        cell = sheet.cell('Z20');
        setInputStyle(cell);
        cell.value('');
    }
}

function updateWifeT4A(sheet) {
    var range = sheet.range('P25:T25');
    if (range.merged()) {
        range.merged(false);
        range = sheet.range('P25:R25');
        range.merged(true);
        setInputStyle(range);
        var cell = sheet.cell('P25');
        cell.value('');

        cell = sheet.cell('S25');
        setLabelStyle(cell);
        cell.style({
            shrinkToFit: false,
            fontSize: 9
        });
        cell.value('BLCL');

        cell = sheet.cell('T25');
        setLabelStyle(cell);
        cell.value('');
    }
}

function setDD(sheet) {
    var cell = sheet.cell('A53');
    cell.value('DD DONE');
    setLabelStyle(cell, true, true);
    cell.style('leftBorder', 'medium');

    var range = sheet.range('B53:C53');
    range.merged(true);
    setInputStyle(range, true);
    cell = sheet.cell('B53');
    cell.value('');
}

function setTeachingSupplies(sheet) {
    var range = sheet.range('G33:G34');
    var cell = sheet.cell('G33');
    if (range.merged() && cell.value() != '') return;

    range.merged(true);
    setLabelStyle(range, true, true);
    cell.value('TEACHING SUPPLIES');

    range = sheet.range('H33:I34');
    range.merged(true);
    setInputStyle(range, true);
    cell = sheet.cell('H33');
    cell.style('fontSize', 18);
    cell.value('');
}

function setHomeAccessibilities(sheet) {
    var range = sheet.range('J33:K34');
    if (range.merged()) return;

    range.merged(true);
    setLabelStyle(range, true, true);
    var cell = sheet.cell('J33');
    cell.value('HOME ACCESSIBILITIES');

    range = sheet.range('L33:L34');
    range.merged(true);
    setInputStyle(range, true);
    cell = sheet.cell('L33');
    cell.style('fontSize', 18);
    cell.value('');
}

function setOSI(sheet) {
    var cell = sheet.cell('D55');
    cell.value('');
    setLabelStyle(cell, true, true);
    cell.style({
        'border': 'medium',
        'horizontalAlignment': 'center',
        'fontSize': 11
    });
    cell.value('O/S');

    var range = sheet.range('E55:T55');
    range.merged(true);
    setInputStyle(range);
    range.style('border', 'medium');
    cell = sheet.cell('E55');
    cell.value('');
    cell.style('horizontalAlignment', 'left');
}

function setPRSold(sheet) {
    var range = sheet.range('P1:T1');
    if (!range.merged()) return;
    range.merged(false);

    range = sheet.range('P1:R1');
    range.merged(true);
    var cell = sheet.cell('P1');
    cell.style({
        'bold': true,
        'horizontalAlignment': 'center'
    });

    range = sheet.range('S1:T1');
    range.merged(true);
    range.style({
        'leftBorder': 'medium',
        'bold': true,
        'fontSize': 14,
        'horizontalAlignment': 'left'
    });
    sheet.cell('S1').value('PR SOLD');

    cell = sheet.cell('U1');
    cell.value('');
    cell.style({
        'fill': 'ffffff',
        'underline': false
    });

    range = sheet.range('V1:Z1');
    range.merged(false);

    range = sheet.range('V1:W1');
    range.merged(true);
    cell = sheet.cell('V1');
    cell.style({
        'fill': 'ffff00',
        'underline': true,
        'fontSize': 11,
        'bold': false,
        'horizontalAlignment': 'left',
        'rightBorder': true
    });
    cell.value('PU DATE');

    range = sheet.range('X1:Z1');
    range.merged(true);
    range.style('leftBorder', 'medium');
    sheet.cell('X1').value('');
}

function updateConsultFeeAndPriceQuoted(sheet) {
    var cell = sheet.cell('Q55');
    if (cell.value() != 'Consult Fee') return;
    cell.value('');
    var range = sheet.range('Q55:R55');
    range.merged(false);

    cell = sheet.cell('S55');
    cell.value('');
    range = sheet.range('S55:T55');
    range.merged(false);


    cell = sheet.cell('U55');
    cell.value('');

    cell = sheet.cell('V55');
    cell.value('');
    range = sheet.range('V55:Z55');
    range.merged(false);

    cell = sheet.cell('U55');
    setLabelStyle(cell, true, true);
    cell.style({
        'border': 'medium',
        'underline': false
    });
    cell.value('Consult Fee');

    range = sheet.range('V55:W55');
    range.merged(true);
    setInputStyle(range, true);
    range.style('bottomBorder', 'medium');
    cell = sheet.cell('V55');
    cell.value('');


    cell = sheet.cell('X55');
    setLabelStyle(cell, true, true);
    cell.style({
        'underline': true,
        'border': 'medium',
        'fontSize': 10
    });
    cell.value('PRICE QUOTED');

    range = sheet.range('Y55:Z55');
    range.merged(true);
    setInputStyle(range, true);
    range.style('bottomBorder', 'medium');
    range.style('rightBorder', 'medium');
    cell = sheet.cell('Y55');
    cell.value('');
}

function updateHusbandDeparture(sheet) {
    unmergeAll('H14:M14', sheet);
    
    range = sheet.range('H14:J14');
    range.merged(true);
    range.style({
        fontSize: 11,
        bold: true,
        horizontalAlignment: 'left',
        rightBorder: true
    });
    sheet.cell('H14').value('');

    range = sheet.range('K14:M14');
    range.merged(true);
    range.style({
        fontSize: 18,
        bold: true,
        horizontalAlignment: 'center'
    });
    sheet.cell('K14').value('');
}

function updateWifeDeparture(sheet) {
    unmergeAll('V14:Z14', sheet);
    
    range = sheet.range('V14:W14');
    range.merged(true);
    range.style({
        fontSize: 11,
        bold: true,
        horizontalAlignment: 'left',
        rightBorder: true
    });
    sheet.cell('V14').value('');

    range = sheet.range('X14:Z14');
    range.merged(true);
    range.style({
        fontSize: 18,
        bold: true,
        horizontalAlignment: 'center'
    });
    sheet.cell('X14').value('');
}

function splitT1135(sheet) {
    unmergeAll('I7:T7', sheet);

    range = sheet.range('I7:N7');
    range.merged(true);
    range.style({
        fontSize: 18,
        bold: true,
        horizontalAlignment: 'left',
        rightBorder: true,
    });
    sheet.cell('I7').value('');

    sheet.range('O7:T7').style({
        fontSize: 14,
        bold: true,
    });

    sheet.range('P7:T7').style({ horizontalAlignment: 'center' });

    sheet.cell('O7').value('T1135');

    range = sheet.range('P7:Q7');
    range.merged(true);
    range.style({
        fontSize: 14,
        bold: true,
        fill: fills.husband.fill,
        horizontalAlignment: 'center',
        rightBorder: true,
    });

    sheet.cell('P7').value('H');
    sheet.cell('R7').value('');
    sheet.cell('S7').style({ rightBorder: true, fill: fills.wife.fill }).value('W');
    sheet.cell('T7').value('');
}

function updateT4APSplit(sheet) {
    unmergeAll('B27:F28', sheet);
    let range = sheet.range('B27:C28');
    range.merged(true);
    range.style({ rightBorder: true });

    range = sheet.range('D27:E28');
    range.merged(true);
    range.style({
        fontSize: 11,
        rightBorder: true,
        fill: fills.husband.fill,
    });

    sheet.cell('B27').value('');
    sheet.cell('D27').value('Split');
    sheet.cell('F27').value('');

    unmergeAll('P27:T28', sheet);
    range = sheet.range('P27:Q28');
    range.merged(true);
    range.style({ rightBorder: true });

    range = sheet.range('R27:S28');
    range.merged(true);
    range.style({
        fontSize: 11,
        rightBorder: true,
        fill: fills.husband.fill,
    });

    sheet.cell('P27').value('');
    sheet.cell('R27').value('Split');
    sheet.cell('T27').value('');
}

function splitCell(sheet) {
    unmergeAll('I8:O8', sheet);
    sheet.cell('G8').value('Cell (1)');
    let range = sheet.range('I8:K8');
    range.merged(true).style({
        fontSize: 12,
        horizontalAlignment: true,
        bold: true
    });
    
    sheet.cell('L8').value('Cell (2)').style({ fontSize: 12 });
    range = sheet.range('M8:O8');
    range.merged(true).style({
        fontSize: 11,
        horizontalAlignment: true,
        bold: true
    });
}

function populateFills(sheet) {
    Object.keys(fills).forEach((type) => {
        const { fill, cells } = fills[type];
        cells.forEach((cell) => {
            sheet.cell(cell).style({
                fill,
                border: true,
                bold: true
            });
        });
    });
    sheet.range('C4:F4').style({ border: 'medium' });
    sheet.range('L4:H4').style({ border: 'medium' });
    sheet.range('O7:T7').style({ border: 'medium' });
    sheet.range('O1:Z4').style({ border: 'medium' });
    sheet.range('A7:Z9').style({ topBorder: 'medium', bottomBorder: 'medium' });
    sheet.range('A23:F24').style({ topBorder: 'thick', bottomBorder: 'thick' });
    sheet.cell('F23').style({ rightBorder: 'thick' });
    sheet.range('G24:J24').style({ topBorder: 'thick', bottomBorder: 'thick' });
    sheet.cell('J24').style({ rightBorder: 'thick' });
    sheet.range('O23:T24').style({ topBorder: 'thick', bottomBorder: 'thick' });
    sheet.cell('T23').style({ rightBorder: 'thick' });
    sheet.range('U24:W24').style({ topBorder: 'thick', bottomBorder: 'thick' });
    sheet.cell('W24').style({ rightBorder: 'thick' });
}

function selfEmployedToSimple(sheet) {
    sheet.cell('P8').style({ fontSize: 11 }).value('Simple');
}

var UpdateService = {
    updateSheet: function(sheet) {
        updateHusbandT4(sheet);
        updateHusbandT5(sheet);
        updateHusbandT4A(sheet);
        updateHusbandDeparture(sheet);
        updateWifeT4(sheet);
        updateWifeT5(sheet);
        updateWifeT4A(sheet);
        updateWifeDeparture(sheet);
        unmergeAll('G33:Z34', sheet);
        setTeachingSupplies(sheet);
        setHomeAccessibilities(sheet);
        setPRSold(sheet);
        setDD(sheet);
        updateConsultFeeAndPriceQuoted(sheet);
        setOSI(sheet);
        splitT1135(sheet);
        updateT4APSplit(sheet);
        splitCell(sheet);
        selfEmployedToSimple(sheet);
        populateFills(sheet);
    }
};

module.exports = UpdateService;