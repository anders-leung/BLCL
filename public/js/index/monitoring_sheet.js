/**
 * Created by ander on 2017-06-06.
 */
function getField(column) {
    var header = $('thead tr').find('th:nth-child(' + column + ')').html();

    switch (header) {
        case 'Pickup Date':
            return 'pickupDate';
        case 'PRE':
            return 'preparer';
        case 'PRE OK':
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
        case 'Signed':
            return 'signed';
        case 'Emailed':
            return 'emailed';
        case 'PYT Rec\'d':
            return 'pytReceived';
        case 'PYT Amount':
            return 'pytAmount';
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
                { type: 'date', targets: [] },
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
            var field = data.field;
            var column = 16;
            if (field == 'checker') {
                column = 17;
            } else if (field == 'readyToPack') {
                column = 19;
            } else if (field == 'emailed') {
                column = 21;
            } else if (field == 'signed') {
                column = 22;
            }
            var fileName = this.data()[31];
            if (fileName == data.fileName) {
                table.cell(rowIdx, column).data(data.value).draw();
                return;
            }
        });
    }

    function updateEvent(data) {
        updateHtml(data.table, data.fileName, data.column, data.value, data.type, false);
    }

    function addClassesToRow(row, href) {
        $(row).attr('data-href', href);
        $(row).find('td').eq(0).addClass('text-nowrap');
        $(row).find('td').eq(1).addClass('text-nowrap');
        $(row).find('td').eq(2).addClass('text-nowrap');
        $(row).find('td').eq(3).addClass('text-nowrap');
        $(row).find('td').eq(10).addClass('toggle');
        $(row).find('td').eq(11).addClass('text-nowrap');
        $(row).find('td').eq(12).addClass('text-nowrap');
        $(row).find('td').eq(13).addClass('text-nowrap');
        $(row).find('td').eq(14).addClass('text-nowrap');
        $(row).find('td').eq(15).addClass('text-nowrap');
        $(row).find('td').eq(16).addClass('text-nowrap');
        $(row).find('td').eq(18).addClass('text-nowrap');
        $(row).find('td').eq(18).addClass('preparer');
        $(row).find('td').eq(20).addClass('edit');
        $(row).find('td').eq(21).addClass('text-nowrap');
        $(row).find('td').eq(21).addClass('date-edit');
        $(row).find('td').eq(22).addClass('text-nowrap');
        $(row).find('td').eq(22).addClass('edit');
        $(row).find('td').eq(23).addClass('text-nowrap');
        $(row).find('td').eq(23).addClass('edit');
        $(row).find('td').eq(24).addClass('toggle');
        $(row).find('td').eq(25).addClass('text-nowrap');
        $(row).find('td').eq(25).addClass('date-edit');
        $(row).find('td').eq(26).addClass('toggle');
        $(row).find('td').eq(27).addClass('text-nowrap');
        $(row).find('td').eq(27).addClass('date-edit');
        $(row).find('td').eq(28).addClass('text-nowrap');
        $(row).find('td').eq(28).addClass('pyt');
        $(row).find('td').eq(29).addClass('text-nowrap');
        $(row).find('td').eq(29).addClass('edit');
        $(row).find('td').eq(30).addClass('text-nowrap');
        $(row).find('td').eq(30).addClass('edit');
        $(row).find('td').eq(31).addClass('text-nowrap');
    }

    function moveRow(row, tableId) {
        var table = $(tableId).DataTable();
        var rowNode = table.row.add(row.data()).draw().node();
        var href = $(row.node()).attr('data-href');
        addClassesToRow(rowNode, href);
        row.remove().draw();
    }

    function updateHtml(tableId, fileName, column, value, type, emit) {
        var table = $(tableId).DataTable();
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

        var field = getField(column + 1);
        switch (field) {
            case 'packed':
                moveRow(row, '#packedTable');
                break;
            case 'emailed':
                moveRow(row, '#emailedTable');
                break;
            default:
                break;
        }

        adjustTables();

        if (!emit) { return; }

        socket.emit('monitoring sheet update', {
            table: tableId,
            column: column,
            type: type,
            fileName: fileName,
            field: field,
            value: value
        });

        enableEditing(tableId, role);
    }

    $.fn.dataTable.moment('dd-M-y');

    setTable('#normalTable');
    setTable('#packedTable');
    setTable('#emailedTable');
    setTable('#osPytTable');

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
        var tableId = '#' + $(target).closest('table').attr('id');
        var table = $(tableId).DataTable();
        var row = $(target).closest('tr');
        var fileName = table.row($(row)).data()[31];
        var check = $(target).html();
        var value = true;
        if (check == 'Y') {
            value = false;
        }
        updateHtml(tableId, fileName, column, value, 'boolean', true);
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
        var tableId = '#' + $(target).closest('table').attr('id');
        var table = $(tableId).DataTable();
        var row = $(target).closest('tr');
        var fileName = table.row($(row)).data()[31];
        var value = $(target).find('input').val();
        var type = 'edit';
        if (column == 26 || column == 28) {
            type = 'date-edit';
        }
        updateHtml(tableId, fileName, column, value, type, true);
        return false;
    }

    function showPytInput(e) {
        var column = $(this).index();
        var tableId = '#' + $(e.target).closest('table').attr('id');
        var table = $(tableId).DataTable();
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
            updateHtml(tableId, fileName, column, $(this).val(), 'select', true)
        });

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