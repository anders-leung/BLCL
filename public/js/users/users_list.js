/**
 * Created by ander on 2017-09-14.
 */
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
        $(this).DataTable({
            'paging': false,
            'filter': false,
            'select': true,
            'columnDefs': [
                { targets : 14, type : 'date' },
                { targets : 0, visible : false, searchable : true }
            ]
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
        return '#' + preparer + 'table';
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
        $(row).find('td').eq(15).addClass('edit');
    }
});