/**
 * Created by ander on 2017-11-22.
 */
var headersToFields = {
    'Signed' : 'signed',
    'CRA': 'cra',
    'Invoiced': 'invoice.date',
    'Invoice #': 'invoice.number',
    'PYT Rec\'d' : 'payment.type',
    'PYT Amount' : 'payment.amount',
    'Agent Signed': 'agentSigned',
    'Outstanding Info' : 'outstandingInfo'
};

function getField(cell) {
    var header;
    $(cell).closest('table').find('thead tr th').each(function(index) {
        if ($(cell).index() == index) header = $(this).text();
    });
    var field = headersToFields[header];
    if (!field) return header.toLowerCase();
    return field;
}

function getColumn(field) {
    var columnIndex = -1;
    for (var header in headersToFields) {
        if (headersToFields[header] == field) {
            $('table:eq(1)').find('thead tr th').each(function(index) {
                if ($(this).text() == header) columnIndex = index + 1;
            });
        }
    }
    return columnIndex;
}

$(document).ready(function() {
    var socket = io();

    socket.on('update nr', updateEvent);

    $('table').each(function() {
        $(this).on('keypress', '.edit', function(e) {
            if (e.which == 13) {
                saveEdits(this, 'input');
            }
        });

        $(this).on('focus', '.datepicker', function() {
            $(this).datepicker({
                dateFormat: 'yy-M-dd',
                onSelect: function() {
                    var td = $(this).parent();
                    if ($(td).find('input').length === 0) return;
                    saveEdits(td, 'input');
                    $(this).datepicker('hide');
                }
            });
        });

        $(this).on('change', '.select', function() {
            saveEdits(this, 'select');
        });
    });

    function saveEdits(that, type) {
        var year = window.location.pathname.split('/')[3];
        var cell = $(that).closest('td');
        var table = $(that).closest('table');
        var service = table.attr('id').split('Table')[0];
        var datatable = $(table).DataTable();
        var row = $(that).closest('tr');
        var fileName = datatable.row($(row)).data()[0];
        var value = $(that).find('input').val();
        if (type == 'select') value = $(that).find('select').val();
        var field = getField(cell);
        updateHtml(year, service, fileName, field, value, true);
        $(that).trigger('enableEditing');
    }

    function updateEvent(data) {
        updateHtml(data.year, data.service, data.fileName, data.field, data.value);
    }

    function updateHtml(year, service, fileName, field, value, emit) {
        if (window.location.pathname.split('/')[3] != year) return;

        var column = getColumn(field);
        console.log(column, fileName, field, value, emit);
        var table = $('#' + service + 'Table').DataTable();
        table.rows().every(function(row) {
            if (this.data()[0] == fileName) {
                table.cell(row, column).data(value);
                adjustTables();
            }
        });

        if (!emit) return;

        socket.emit('update nr', {
            year: year,
            service: service,
            fileName : fileName,
            field : field,
            value : value
        });
    }
});