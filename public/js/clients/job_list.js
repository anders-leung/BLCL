/**
 * Created by ander on 2017-09-18.
 */

function getField(column) {
    var header = $('thead tr').find('th:nth-child(' + column + ')').html();
    console.log(header);

    switch (header) {
        case 'PRE OK':
            return 'preparerDone';
        case 'CKR':
            return 'checker';
        case 'Ready To Pack':
            return 'readyToPack';
        case 'Signed':
            return 'signed';
        case 'Emailed':
            return 'emailed';
    }
}

function adjustTables() {
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
}

function disableEditing(tableId) {
    console.log('disable call');
    $(tableId).off('click');
}

statuses = statuses.split(",");

$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    adjustTables();
});

$(document).ready(function() {
    var previousValue;
    var socket = io();

    // function for setting up tables
    function setTable(tableId) {
        if (tableId == '#newTable') {
            $('.tab-pane').each(function (i) {
                if (i == 0) {
                    $(this).addClass('in');
                    $(this).addClass('active');
                }
            });
        }

        $(tableId).on('focus', '.datepicker', function() {
            $(this).datepicker({
                dateFormat: 'dd-M-y',
                onSelect: function() {
                    var value = $(this).parent().find('input').val();
                    if (value) updateHtml(tableId, $(this).parent(), value);
                    return false;
                }
            });
        });

        $(tableId + ' tfoot th').each( function () {
            var title = $(this).text();
            $(this).html( '<input type="text"/>' );
        });

        var table = $(tableId).DataTable({
            'columnDefs': [
                { type: 'date', targets: [7, 17, 19, 20] },
                { visible: false, searchable: true, targets: 26 }
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

        $(tableId).on('keypress', '.edit', function(e) {
            if (e.which == 13) {
                var value = $(this).find('input').val();
                if (value == '') return;
                console.log('value: ', value);
                updateHtml(tableId, this, value);
            }
        }).on('keyup', '.status, .edit, .date-edit', function(e) {
            if (e.which == 27) {
                $(this).html(previousValue);
                enableEditing(tableId);
                adjustTables();
            }
        });

        enableEditing(tableId);
    }

    function enableEditing(tableId) {
        var table = $(tableId);
        table.on('click', '.edit', showInput);
        table.on('click', '.status', showStatusInput);
        table.on('click', '.date-edit', showDateInput);
    }

    setTable('#newTable');
    setTable('#wipTable');
    setTable('#okTable');
    setTable('#emailedTable');

    function addClassesToRow(row, href) {
        $(row).attr('data-href', href);
        $(row).find('td').eq(8).addClass('text-nowrap');
        $(row).find('td').eq(9).addClass('text-nowrap');
        $(row).find('td').eq(10).addClass('text-nowrap');
        $(row).find('td').eq(11).addClass('text-nowrap');
        $(row).find('td').eq(12).addClass('text-nowrap');
        $(row).find('td').eq(13).addClass('text-nowrap');
        $(row).find('td').eq(16).addClass('status');
        $(row).find('td').eq(17).addClass('edit');
        $(row).find('td').eq(18).addClass('date-edit');
        $(row).find('td').eq(18).addClass('text-nowrap');
        $(row).find('td').eq(19).addClass('text-nowrap');
        $(row).find('td').eq(20).addClass('date-edit');
        $(row).find('td').eq(20).addClass('text-nowrap');
        $(row).find('td').eq(21).addClass('date-edit');
        $(row).find('td').eq(21).addClass('text-nowrap');
        $(row).find('td').eq(22).addClass('text-nowrap');
        $(row).find('td').eq(23).addClass('text-nowrap');
        $(row).find('td').eq(24).addClass('text-nowrap');
        $(row).find('td').eq(26).addClass('text-nowrap');
    }

    function moveRow(row, tableId) {
        var table = $(tableId).DataTable();
        var rowNode = table.row.add(row.data()).draw().node();
        var href = $(row.node()).attr('data-href');
        addClassesToRow(rowNode, href);
        row.remove().draw();
    }

    function updateHtml(tableId, cell, value, type) {
        console.log($(cell))
        $(cell).html(value);
        var column = $(cell).parent().children().index($(cell));
        var rowIndex = $(cell).closest('tr').index();

        var table = $(tableId).DataTable();
        table.cell($(cell)).data(value);

        var fileName = table.cell(rowIndex, 26).data();

        if (column == 16) {
            if (value == '') moveRow(table.row(rowIndex), '#newTable');
            if (value == 'WIP') moveRow(table.row(rowIndex), '#wipTable');
            if (value == 'OK') moveRow(table.row(rowIndex), '#okTable');
        } else if (column == 20) {
            if (value != '') moveRow(table.row(rowIndex), '#emailedTable');
        } else if (column == 18) {
            if (value != '') table.row(rowIndex).remove().draw();
        }

        var field = getField(column + 1);
        console.log(field);

        enableEditing(tableId);
        adjustTables();

        socket.emit('done preparing', {
            field: field,
            fileName: fileName,
            value: value
        });
    }

    socket.on('monitoring sheet update', updateEvent);

    function updateEvent(data) {

    }

    function showStatusInput(e) {
        var tableId = '#' + $(this).closest('table').attr('id');
        var cell = e.target;
        var value = $(cell).html();
        previousValue = value;
        var select = "<select>";
        for (var i = 0; i < statuses.length; i++) {
            var option = "<option value='" + statuses[i] + "'";
            if (statuses[i] == value) {
                option += " selected";
            }
            option += ">" + statuses[i] + "</option>";
            select += option;
        }
        select += "</select>";
        select = $(select);
        $(cell).html(select);

        $(select).focus();

        $(select).on('change', function() {
            updateHtml(tableId, $(this).parent(), $(this).val(), 'select');
        });

        disableEditing(tableId);
        adjustTables();
    }

    function showInput(e) {
        console.log('showInput called')
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

    function showDateInput(e) {
        console.log('showDateInput')
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