/**
 * Created by ander on 2017-12-17.
 */
var XLSX = require('xlsx-populate');

function setInputStyle(object) {
    object.style({
        'bold': true,
        'fontSize': 18,
        'horizontalAlignment': 'center'
    });
}

function setLabelStyle(object) {
    object.style({
        'bold': false,
        'fontSize': 11,
        'horizontalAlignment': 'center'
    });
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
        cell.value('JT');

        cell = sheet.cell('K20');
        setInputStyle(cell);
        cell.value('');

        range = sheet.range('L20:M20');
        range.merged(false);

        cell = sheet.cell('L20');
        setLabelStyle(cell);
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
        cell.value('JT');

        cell = sheet.cell('X20');
        setInputStyle(cell);
        cell.value('');

        range = sheet.range('Y20:Z20');
        range.merged(false);

        cell = sheet.cell('Y20');
        setLabelStyle(cell);
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
        cell.value('BLCL');

        cell = sheet.cell('T25');
        setLabelStyle(cell);
        cell.value('');
    }
}

function setDD(sheet) {
    var cell = sheet.cell('A53');
    cell.value('DD DONE');
    cell.style({
        'bold': true,
        'fontSize': 11,
        'border': true,
        'horizontalAlignment': 'left'
    });
    cell.style('leftBorder', 'thick');

    var range = sheet.range('B53:C53');
    range.merged(true);
    setInputStyle(range);
    range.style('border', true);

    cell = sheet.cell('B53');
    cell.value('');
}

function setOSP(sheet) {
    var range = sheet.range('G33:G34');
    if (range.merged()) return;
    range.merged(true);
    var cell = sheet.cell('G33');
    cell.style({
        'border': true,
        'bold': true,
        'horizontalAlignment': 'left'
    });
    cell.value('O/S INFO');

    range = sheet.range('O33:O34');
    range.merged(false);
    range = sheet.range('H33:Z34');
    range.merged(true);
    range.style({
        'border': true,
        'bold': true,
        'fontSize': 14,
        'horizontalAlignment': 'left'
    });
    range.style('rightBorder', 'thick');

    cell = sheet.cell('H33');
    cell.value('');
}

function setPRSold(sheet) {
    var range = sheet.range('P1:T1');
    if (!range.merged()) return;
    range.merged(false);

    range = sheet.range('P1:R1');
    range.merged(true);
    var cell = sheet.cell('P1');
    cell.style({
        'border': true,
        'bold': true,
        'horizontalAlignment': 'center'
    });

    range = sheet.range('S1:T1');
    range.merged(true);
    range.style({
        'border': 'thick',
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
        'bold': false
    });
    cell.value('PR SOLD');

    range = sheet.range('X1:Z1');
    range.merged(true);
    sheet.cell('X1').value('');
}

var UpdateService = {
    updateSheet: function(sheet) {
            updateHusbandT4(sheet);
            updateHusbandT5(sheet);
            updateHusbandT4A(sheet);
            updateWifeT4(sheet);
            updateWifeT5(sheet);
            updateWifeT4A(sheet);
            setPRSold(sheet);
            setDD(sheet);
            setOSP(sheet);
    }
};

module.exports = UpdateService;