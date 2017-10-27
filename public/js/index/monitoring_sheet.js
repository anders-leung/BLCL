/**
 * Created by ander on 2017-06-06.
 */
pyt = pyt.split(",");

function getFileName(row) {
    var husbandLastName = $(row).find('td:nth-child(12)').html();
    var husbandFirstName = $(row).find('td:nth-child(13)').html();
    var wifeLastName = $(row).find('td:nth-child(14)').html();
    var wifeFirstName = $(row).find('td:nth-child(15)').html();

    var fileName = '';

    if (husbandFirstName) {
        fileName += husbandLastName + ', ' + husbandFirstName;
        if (wifeFirstName) {
            fileName += ' and ';
            fileName += wifeLastName + ', ' + wifeFirstName;
        }
    } else {
        fileName += wifeLastName + ', ' + wifeFirstName;
    }
    return fileName;
}

function getField(column) {
    var header = $('thead tr').find('th:nth-child(' + column + ')').html();

    switch (header) {
        case 'Picked Up':
            return 'pickedUp';
        case 'Preparer Done':
            return 'preparerDone';
        case 'Checker Done':
            return 'checkerDone';
        case 'Outstanding Info':
            return 'outstandingInfo';
        case 'Remarks':
            return 'remarks';
        case 'Ready for Pickup':
            return 'readyForPickup';
        case 'Call Date':
            return 'callDate';
        case 'Pickup OK':
            return 'pickupOk';
        case 'Emailed':
            return 'emailed';
        case 'PYT Received':
            return 'pytReceived';
        case 'Things to do After Pickup':
            return 'thingsToDo';
        case 'PRC Last Year':
            return 'prcLastYear';
    }
}

function setTable(tableId) {
    $('.tab-pane').each(function(i) {
        if (i == 0) {
            $(this).addClass('in');
            $(this).addClass('active');
            return;
        }
    });

    $(tableId + ' tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text"/>' );
    });

    var table = $(tableId).DataTable({
        'columnDefs': [{
            type: 'date', targets: 0
        }],
        'select': true,
        'scrollX': true
    });
    // Setup - add a text input to each footer cell

    // Apply the search
    table.columns().every(function(i) {
        var that = this;
        $('input', this.footer()).on('keyup change', function() {
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });
    });
}

function resetTable(tableId) {
    $(tableId).DataTable().destroy();
    setTable(tableId);
}

$(document).ready(function() {
    var socket = io();

    socket.on('done preparing', preparerEvent);
    socket.on('monitoring sheet update', updateEvent);

    function preparerEvent(data) {
        var row = $('td').filter(function() {
            return $(this).html() == data.phone_number;
        }).closest('tr');

        var cell = $(row).find('td:nth-child(20)');
        $(cell).html(data.value);
        var table = $('table').DataTable();
        table.cell($(cell)).data(data.value);
    }

    function updateEvent(data) {
        updateHtml(data.row, data.column, data.value, data.type);
    }

    function updateHtml(row, column, value, type, emit) {
        var rowHtml = $('tbody tr').eq(row);
        var cell = $(rowHtml).find('td:nth-child(' + column + ')');

        var table = $('#normalTable').DataTable();

        var addRow = table.row($(rowHtml));
        var otherTable;

        if (typeof(value) === 'boolean') {
            $(cell).html('N');
            if (value) {
                $(cell).html('Y');
            }
            if (column == 11) {
                otherTable = $('#pickedUpTable').DataTable();
                otherTable.row.add(addRow.data()).draw();
                addRow.remove().draw();
            } else if (column == 25) {
                otherTable = $('#packedTable').DataTable();
                otherTable.row.add(addRow.data()).draw();
                addRow.remove().draw();
                $('#packedTable').destroy();
                resetTable('#packedTable');
            }
        } else {
            if (type == 'date') {
                $(cell).on('click', showDateInput);
            } else if (type == 'edit') {
                $(cell).on('click', showInput);
            } else if (type == 'select') {
                $(cell).find('select').toggle();
                $(cell).on('click', showPytInput);
            }
            cell.html(value);
            table.cell($(cell)).data(value);
            if (column == 28) {
                otherTable = $('#emailedTable').DataTable();
                otherTable.row.add(addRow.data()).draw();
                addRow.remove().draw();
                resetTable('#emailedTable');
            }
        }

        if (!emit) { return; }

        var fileName = getFileName(rowHtml);
        var field = getField(column);
        socket.emit('monitoring sheet update', {
            row: row,
            column: column,
            type: type,
            fileName: fileName,
            field: field,
            value: value
        });
    }

    function assignJobs() {
        $('tbody tr').each(function() {
            var phone_number = $(this).find('td:nth-child(' + 2 + ')').html();
            var preparer = $(this).find('td:nth-child(' + 19 + ')').html();
            socket.emit('assigning jobs', {
                phone_number: phone_number,
                preparer: preparer
            });
        });
    }

    $.fn.dataTable.moment('dd-M-y');

    resetTable('#normalTable');
    resetTable('#packedTable');
    resetTable('#emailedTable');
    resetTable('#pickedUpTable');

    $('tr td').not('.toggle, .edit, .date-edit').dblclick(function() {
        window.location = $(this).parent().data('href');
    });

    $('#assignJobs').click(function() {
        assignJobs();
    });

    $('.toggle').click(function() {
        var column = $(this).index();
        var row = $(this).closest('tr').index();
        var check = $(this).html();
        var value = true;
        if (check == 'Y') {
            value = false;
        }
        updateHtml(row, column + 1, value, null, true);
    });

    function showInput(e) {
        var cell = e.target;
        var value = $(this).html();
        var input = $("<input type='text' value='" + value + "'>");
        $(this).html(input);
        $(this).toggleClass('edit');
        $(input).focus();
        var length = $(input).val().length;
        var target = e.target.firstChild;
        target.setSelectionRange(length, length);

        $(cell).off('click', showInput);
    }

    $('.edit').on('click', showInput);

    $('.edit, .date-edit').keypress(function(e) {
        if (e.which == 13) {
            var column = $(this).index();
            var row = $(this).closest('tr').index();
            var value = $(this).find('input').val();
            var type = 'edit';
            if (column == 25 || column == 27) {
                type = 'date-edit';
            }
            updateHtml(row, column + 1, value, type, true);
            return false;
        }
    });

    $('.pyt').on('click', showPytInput);

    function showPytInput(e) {
        var column = $(this).index();
        var row = $(this).closest('tr').index();
        var cell = e.target;
        var value = $(cell).html();
        var select = "<select>";
        for (var i = 0; i < pyt.length; i++) {
            var option = "<option value='" + pyt[i] + "'";
            if (pyt[i] == value) {
                option += " selected";
            }
            option += ">" + pyt[i] + "</option>";
            select += option;
        }
        select += "</select>";
        select = $(select);
        $(cell).html(select);

        $(select).focus();

        $(select).focusout(function() {
            updateHtml(row, column + 1, $(this).val(), 'select', true)
        });

        $(cell).off('click', showPytInput);
    }

    function showDateInput(e) {
        var cell = e.target;
        var value = $(this).html();
        var date = $("<input type='date' value='" + value + "'>");
        $(this).html(date);
        $(date).focus();
        $(this).toggleClass('date-edit');

        $(cell).off('click', showDateInput);
    }

    $('.date-edit').on('click', showDateInput);
});