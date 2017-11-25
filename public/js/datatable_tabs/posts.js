/**
 * Created by ander on 2017-11-22.
 */
var headersToFields = {
    'PRE OK' : 'preparerDone',
    'Pickup Date' : 'pickupDate',
    'PRE' : 'preparer',
    'CKR' : 'checker',
    'Outstanding Info' : 'outstandingInfo',
    'Ready To Pack' : 'readyToPack',
    'Packed' : 'packed',
    'Emailed' : 'emailed',
    'Signed' : 'signed',
    'PYT Rec\'d' : 'pytRec',
    'PYT Amount' : 'pytAmt',
    'Call Date' : 'callDate',
    'Remarks' : 'remarks'
};

function adjustTables() {
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
}

function getField(cell) {
    var header;
    $('table').first().find('thead tr th').each(function(index) {
        if ($(cell).index() == index) header = $(this).html();
    });
    return headersToFields[header];
}

function getColumn(field) {
    var columnIndex = -1;
    for (var header in headersToFields) {
        if (headersToFields[header] == field) {
            $('table').first().find('thead tr th').each(function(index) {
                if ($(this).html() == header) columnIndex = index + 1;
            });
        }
    }
    return columnIndex;
}

$(document).ready(function() {
    var socket = io();

    socket.on('client side update', updateEvent);

    $('table').each(function() {
        $(this).on('custom', '.toggle', function() {
            saveEdits(this, 'toggle');
        });

        $(this).on('keypress', '.edit', function(e) {
            if (e.which == 13) {
                saveEdits(this, 'input');
            }
        });

        $(this).on('focus', '.datepicker', function() {
            $(this).datepicker({
                dateFormat: 'dd-M-y',
                onSelect: function() {
                    var td = $(this).parent();
                    if ($(td).find('input').length === 0) return;
                    saveEdits(td, 'input');
                }
            });
        });

        $(this).on('change', '.select', function() {
            saveEdits(this, 'select');
        });
    });

    function saveEdits(that, type) {
        var cell = $(that).closest('td');
        var table = $(that).closest('table').DataTable();
        var row = $(that).closest('tr');
        var fileName = table.row($(row)).data()[0];
        var value = $(that).find('input').val();
        if (type == 'select') value = $(that).find('select').val();
        if (type == 'toggle') value = $(cell).html() == 'Y' ? '' : 'Y';
        var field = getField(cell);
        updateHtml(fileName, field, value, true);
        $(that).trigger('enableEditing');
    }

    function updateEvent(data) {
        updateHtml(data.fileName, data.field, data.value);
    }

    function updateHtml(fileName, field, value, emit) {
        var column = getColumn(field);
        $('table').each(function() {
            var table = $(this).DataTable();
            table.rows().every(function(row) {
                if (this.data()[0] == fileName) {
                    table.cell(row, column).data(value);
                    adjustTables();
                }
            });
        });

        if (!emit) return;

        socket.emit('client side update', {
            fileName : fileName,
            field : field,
            value : value
        });
    }

    function getRow(fileName) {
        var row;
        $('table').each(function() {
            var table = $(this).DataTable();
            table.rows().every(function() {
                if (this.data()[0] == fileName) row = this;
            });
        });

        return row;
    }

    function moveRow(row, tableId) {
        if (tableId == 'none') return row.remove().draw();
        var table = $(tableId).DataTable();
        var rowNode = table.row.add(row.data()).draw().node();
        var href = $(row.node()).attr('data-href');
        addClassesToRow(rowNode, href);
        row.remove().draw();
    }
});