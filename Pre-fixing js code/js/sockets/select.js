/**
 * Created by ander on 2017-11-22.
 */
var headersToFields = {
    'PRE OK' : 'preparerDone',
    'Pickup Date' : 'pickupDate',
    'PRE' : 'preparer'
};

function getField(cell) {
    var header = $(cell).closest('table').find('th').eq($(cell).index());
    return headersToFields[header.html()];
}

function getColumn(field) {
    var columnIndex = -1;
    for (var header in headersToFields) {
        if (headersToFields[header] == field) {
            $('table').first().find('thead tr th').each(function(index) {
                if ($(this).html() == header) columnIndex = index + 1;
            })
        }
    }
    return columnIndex;
}

$(document).ready(function() {
    var socket = io();

    $('table').each(function() {
        $(this).on('keypress', '.edit, .date-edit', function(e) {
            if (e.which == 13) {
                var table = $(this).closest('table').DataTable();
                var row = $(this).closest('tr');
                var fileName = table.row($(row)).data()[0];
                var value = $(this).find('input').val();
                updateHtml(table, fileName, getField(this), value, true);
            }
        });
    });

    function updateHtml(table, fileName, field, value, emit) {
        var column = getColumn(field);
        table.rows().every(function(row) {
            if (this.data()[0] == fileName) {
                table.cell(row, column).data(value);
            }
        });

        if (!emit) return;

        socket.emit('client side update', {
            tableId : table.table().node().id,
            fileName : fileName,
            field : field,
            value : value
        });
    }
});