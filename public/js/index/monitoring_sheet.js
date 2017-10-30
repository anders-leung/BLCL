/**
 * Created by ander on 2017-06-06.
 */

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
            return 'packed';
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

function adjustTables() {
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
}

$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    adjustTables();
});

$(document).ready(function() {
    pyt = payment.split(',');

    // function for setting up tables
    function setTable(tableId) {
        if (tableId == '#normalTable') {
            $('.tab-pane').each(function (i) {
                if (i == 0) {
                    $(this).addClass('in');
                    $(this).addClass('active');
                }
            });
        }

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

        table.columns().every(function(i) {
            var that = this;
            $('input', this.footer()).on('keyup change', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });

        enableEditing(tableId);
        $(tableId).on('focus', '.datepicker', function() {
            $(this).datepicker({
                dateFormat: 'dd-M-y'
            });
        })
    }

    function resetTable(tableId) {
        $(tableId).DataTable().destroy();
        setTable(tableId);
    }

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

        var table = $(cell).closest('table').DataTable();

        var addRow = table.row($(rowHtml));
        var otherTable;

        if (typeof(value) === 'boolean') {
            $(cell).html('');
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
            }
        } else {
            var tableId = $(cell).closest('table');
            if (type == 'select') {
                $(cell).find('select').toggle();
            }
            enableEditing(tableId)
            cell.html(value);
            table.cell($(cell)).data(value);
            if (column == 28) {
                otherTable = $('#emailedTable').DataTable();
                otherTable.row.add(addRow.data()).draw();
                addRow.remove().draw();
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

    setTable('#normalTable');
    setTable('#packedTable');
    setTable('#emailedTable');
    setTable('#pickedUpTable');

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

    function enableEditing(tableId) {
        $(tableId).on('click', '.edit', showInput);
        $(tableId).on('click', '.date-edit', showDateInput);
        $(tableId).on('click', '.pyt', showPytInput);
    }

    function disableEditing(tableId) {
        $(tableId).off('click');
    }

    function showInput(e) {
        var cell = e.target;
        var value = $(this).html();
        var input = $("<input type='text' value='" + value + "'>");
        $(this).html(input);
        $(input).focus();
        var length = $(input).val().length;
        var target = e.target.firstChild;
        target.setSelectionRange(length, length);

        var table = $(cell).closest('table');
        disableEditing(table);
        adjustTables()
    }

    function saveEdits(target) {
        var column = $(target).index();
        var row = $(target).closest('tr').index();
        var value = $(target).find('input').val();
        var type = 'edit';
        if (column == 26 || column == 28) {
            type = 'date-edit';
        }
        updateHtml(row, column + 1, value, type, true);
        return false;
    }

    $('.edit, .date-edit').keypress(function(e) {
        if (e.which == 13) {
            saveEdits(this);
        }
    }).focusout(function() {
        saveEdits(this);
    });

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

        var table = $(cell).closest('table');
        disableEditing(table);
        adjustTables();
    }

    function showDateInput(e) {
        var cell = e.target;
        var value = $(this).html();
        var date = $("<input type='text' class='datepicker' value='" + value + "'>");
        $(this).html(date);
        $(date).focus();

        var table = $(cell).closest('table');
        disableEditing(table);
        adjustTables();
    }
});