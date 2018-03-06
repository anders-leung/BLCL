/**
 * Created by ander on 2017-12-17.
 */
var XLSX = require('xlsx-populate');

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
    cell.value('');
}

function setOSI(sheet) {
    var cell = sheet.cell('D55');
    cell.value('');
    setLabelStyle(cell, true, true);
    cell.style('border', 'medium');
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
    cell.style('fill', 'ffffff');

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
        'horizontalAlignment': 'left'
    });
    cell.value('PU DATE');

    range = sheet.range('X1:Z1');
    range.merged(true);
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

var UpdateService = {
    updateSheet: function(sheet) {
        updateHusbandT4(sheet);
        updateHusbandT5(sheet);
        updateHusbandT4A(sheet);
        updateWifeT4(sheet);
        updateWifeT5(sheet);
        updateWifeT4A(sheet);
        setTeachingSupplies(sheet);
        setHomeAccessibilities(sheet);
        setPRSold(sheet);
        setDD(sheet);
        updateConsultFeeAndPriceQuoted(sheet);
        setOSI(sheet);
    }
};

module.exports = UpdateService;