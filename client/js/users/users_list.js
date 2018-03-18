/**
 * Created by ander on 2017-09-14.
 */

function colorCells(row) {
    $(row).find('td:eq(12)').css('color', 'red');
    $(row).find('td:eq(13)').css('color', 'red');
}

function colorHeader(header) {
    if (header.index() == 12) header.css('color', 'red');
    if (header.index() == 13) header.css('color', 'red');
}

function adjustTables() {
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
}

$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    adjustTables();
});

$(document).ready(function() {
    $('.nav-tabs a').each(function(i) {
        if (i == 0) {
            $(this).addClass('active');
            return;
        }
    });

    $('.tab-pane').each(function(i) {
        if (i == 0) {
            $(this).addClass('in');
            $(this).addClass('active');
            return;
        }
    });

    $('table').each(function() {
        var tableId = '#' + $(this).attr('id');
        if (tableId == '#normalTable') {
            $('.tab-pane').each(function (i) {
                if (i == 0) {
                    $(this).addClass('in');
                    $(this).addClass('active');
                }
            });
        }

        $(tableId + ' tfoot th').each( function (i) {
            var title = $(this).text();
            //$(this).html(i)
            $(this).html( '<input type="text"/>' );
        });

        var table = $(tableId).DataTable({
            'scrollX': true,
            'select': true,
            'columnDefs': [
                { targets : 14, type : 'date' },
                { targets : 0, visible : false, searchable : true }
            ],
            rowCallback: function(row, data, index, full) {
                colorCells(row);
            },
        });

        table.columns().every(function() {
            var that = this;
            $('input', this.footer()).on('keyup change', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
            
            colorHeader($(this.header()));
        });

        $(tableId).on('dblclick', 'tr td:not(.edit, .date-edit, .select)', function() {
            window.location = $(this).parent().data('href');
        });
    });

    var socket = io();

    socket.on('client side update', checkRows);

    function checkRows(data) {
        var row = getRow(data.fileName);
        console.log(data);
        var tableId = findTableForRow(row);
        if (tableId) moveRow(row, tableId);
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

    function findTableForRow(row) {
        var preparer = row.data()[15];
        return '#' + preparer.toUpperCase() + 'Table';
    }

    function moveRow(row, tableId) {
        if (tableId == 'none') return row.remove().draw();
        var table = $(tableId).DataTable();
        var rowNode = table.row.add(row.data()).draw().node();
        var href = $(row.node()).attr('data-href');
        addClassesToRow(rowNode, href);
        row.remove().draw();
    }

    function addClassesToRow(row, href) {
        var $row = $(row);
        $row.attr('data-href', href);
        $row.find('td').each(function() {
            $(this).addClass('text-nowrap');
        });
        $(row).find('td').eq(11).addClass('select status admin');
        $(row).find('td').eq(14).addClass('select initials admin');
    }
});