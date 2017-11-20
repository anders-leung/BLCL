/**
 * Created by ander on 2017-09-18.
 */
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

        $(tableId + ' tfoot th').each( function () {
            var title = $(this).text();
            $(this).html( '<input type="text"/>' );
        });

        var table = $(tableId).DataTable({
            'columnDefs': [
                { type: 'date', targets: 0 },
                { visible: false, searchable: true, targets: 31 },
                { visible: false, targets: 18 }
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
                updateHtml(tableId, this, value);
            }
        }).on('keyup', '.status, .edit', function(e) {
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
        console.log('enable editing')
        table.on('click', '.edit', showInput);
        table.on('click', '.status', showStatusInput);
    }

    setTable('#newTable');
    setTable('#wipTable');
    setTable('#okTable');

    function addClassesToRow(row, href) {
        $(row).attr('data-href', href);
        $(row).find('td').eq(0).addClass('text-nowrap');
        $(row).find('td').eq(1).addClass('text-nowrap');
        $(row).find('td').eq(2).addClass('text-nowrap');
        $(row).find('td').eq(3).addClass('text-nowrap');
        $(row).find('td').eq(11).addClass('text-nowrap');
        $(row).find('td').eq(12).addClass('text-nowrap');
        $(row).find('td').eq(13).addClass('text-nowrap');
        $(row).find('td').eq(14).addClass('text-nowrap');
        $(row).find('td').eq(15).addClass('text-nowrap');
        $(row).find('td').eq(16).addClass('text-nowrap');
        $(row).find('td').eq(18).addClass('status');
        $(row).find('td').eq(19).addClass('edit');
        $(row).find('td').eq(21).addClass('text-nowrap');
        $(row).find('td').eq(22).addClass('text-nowrap');
        $(row).find('td').eq(24).addClass('text-nowrap');
        $(row).find('td').eq(26).addClass('text-nowrap');
        $(row).find('td').eq(27).addClass('text-nowrap');
        $(row).find('td').eq(28).addClass('text-nowrap');
        $(row).find('td').eq(29).addClass('text-nowrap');
    }

    function moveRow(row, tableId) {
        var table = $(tableId).DataTable();
        var rowNode = table.row.add(row.data()).draw().node();
        var href = $(row.node()).attr('data-href');
        addClassesToRow(rowNode, href);
        row.remove().draw();
    }

    function updateHtml(tableId, cell, value, type) {
        $(cell).html(value);
        var rowIndex = $(cell).closest('tr').index();

        var table = $(tableId).DataTable();
        table.cell($(cell)).data(value);

        var fileName = table.cell(rowIndex, 31).data();

        if (value == 'WIP') {
            moveRow(table.row(rowIndex), '#wipTable')
        }

        if (value == 'OK') {
            moveRow(table.row(rowIndex), '#okTable')
        }

        var field = 'checker';
        if (type == 'select') {
            field = 'preparerDone';
        }

        enableEditing(tableId);
        adjustTables();

        socket.emit('done preparing', {
            field: field,
            fileName: fileName,
            value: value
        });
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
});