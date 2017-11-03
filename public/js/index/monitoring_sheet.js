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
        case 'Preparer':
            return 'preparer';
        case 'Preparer Done':
            return 'preparerDone';
        case 'Ready To Pack':
            return 'readyToPack';
        case 'Outstanding Info':
            return 'outstandingInfo';
        case 'Remarks':
            return 'remarks';
        case 'Packed':
            return 'packed';
        case 'Call Date':
            return 'callDate';
        case 'Pickup OK':
            return 'pickupOk';
        case 'Emailed':
            return 'emailed';
        case 'PYT Rec\'d':
            return 'pytReceived';
        case 'PYT Amount':
            return 'pytAmount';
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
    var previousValue;

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
            'columnDefs': [
                { type: 'date', targets: 0 },
                { visible: false, searchable: true, targets: 31 }
            ],
            'select': true,
            'scrollX': true
        });

        table.columns().every(function() {
            var that = this;
            $('input', this.footer()).on('keyup change', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });

        enableEditing(tableId, role);
        $(tableId).on('focus', '.datepicker', function() {
            $(this).datepicker({
                dateFormat: 'dd-M-y',
                onSelect: function() {
                    saveEdits($(this).parent())
                }
            });
        });

        $(tableId).on('keypress', '.preparer, .edit, .date-edit', function(e) {
            if (e.which == 13) {
                saveEdits(this);
            }
        });

        $(tableId).on('keyup', '.preparer, .pyt, .edit, .date-edit', function(e) {
            if (e.which == 27) {
                console.log('keyup')
                $(this).html(previousValue);
                enableEditing(tableId, role);
                adjustTables();
            }
        });

        $(tableId).on('dblclick', 'tr td:not(.toggle, .edit, .date-edit)', function() {
            window.location = $(this).parent().data('href');
        });
    }

    function resetTable(tableId) {
        $(tableId).DataTable().destroy();
        setTable(tableId);
    }

    var socket = io();

    socket.on('done preparing', preparerEvent);
    socket.on('monitoring sheet update', updateEvent);

    function preparerEvent(data) {
        var table = $('#normalTable').DataTable();
        table.rows().every(function(rowIdx) {
            var fileName = this.data()[31];
            if (fileName == data.fileName) {
                table.cell(rowIdx, 19).data(data.value).draw();
                return;
            }
        });
    }

    function updateEvent(data) {
        updateHtml(data.table, data.fileName, data.column, data.value, data.type, false);
    }

    function moveRow(row, tableId) {
        console.log($(row))
        var table = $(tableId).DataTable();
        table.row.add(row.data()).draw();
        row.remove().draw();
    }

    function updateHtml(table, fileName, column, value, type, emit) {
        var tableId = table.table().node().id;
        var row;
        table.rows().every(function(rowIdx) {
            var name = this.data()[31];
            if (name == fileName) {
                if (type == 'boolean') value = value ? 'Y' : '';
                if (type == 'select') $('select').toggle();
                table.cell(rowIdx, column).data(value).draw();
                row = this;
            }
        });

        switch (column) {
            case 24:
                moveRow(row, '#packedTable');
                break;
            case 27:
                moveRow(row, '#emailedTable');
                break;
            default:
                return;
        }

        return;
        if (!emit) { return; }

        var field = getField(column);
        socket.emit('monitoring sheet update', {
            column: column,
            type: type,
            fileName: fileName,
            field: field,
            value: value
        });

        enableEditing('#' + tableId);
        adjustTables();
    }

    $.fn.dataTable.moment('dd-M-y');

    setTable('#normalTable');
    setTable('#packedTable');
    setTable('#emailedTable');
    setTable('#signedTable');

    function enableEditing(tableId, role) {
        $(tableId).on('click', '.edit', showInput);
        $(tableId).on('click', '.date-edit', showDateInput);
        $(tableId).on('click', '.pyt', showPytInput);
        $(tableId).on('click', '.toggle', toggle);

        if (role == 'Administrator') {
            $(tableId).on('click', '.preparer', showInput);
        }
    }

    function disableEditing(tableId) {
        $(tableId).off('click');
    }

    function toggle(e) {
        var target = e.target;
        var column = $(target).index();
        var table = $(target).closest('table').DataTable();
        var row = $(target).closest('tr');
        var fileName = table.row($(row)).data()[31];
        var check = $(target).html();
        var value = true;
        if (check == 'Y') {
            value = false;
        }
        updateHtml(table, fileName, column, value, 'boolean', true);
    }

    function showInput(e) {
        var cell = e.target;
        var value = $(this).html();
        previousValue = value;
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
        var table = $(target).closest('table').DataTable();
        var row = $(target).closest('tr');
        var fileName = table.row($(row)).data()[31];
        var value = $(target).find('input').val();
        var type = 'edit';
        if (column == 26 || column == 28) {
            type = 'date-edit';
        }
        updateHtml(table, fileName, column, value, type, true);
        return false;
    }

    function showPytInput(e) {
        var column = $(this).index();
        var table = $(this).closest('table').DataTable();
        var row = $(this).closest('tr');
        var fileName = table.row($(row)).data()[31];
        var cell = e.target;
        var value = $(cell).html();
        previousValue = value;
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

        $(select).on('change', function() {
            updateHtml(table, fileName, column, $(this).val(), 'select', true)
        });

        var tableId = $(cell).closest('table');
        disableEditing(tableId);
        adjustTables();
    }

    function showDateInput(e) {
        var cell = e.target;
        var value = $(this).html();
        previousValue = value;
        var date = $("<input type='text' class='datepicker' value='" + value + "'>");
        $(this).html(date);
        $(date).focus();

        var table = $(cell).closest('table');
        disableEditing(table);
        adjustTables();
    }
});