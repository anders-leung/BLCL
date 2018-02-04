/**
 * Created by ander on 2017-06-06.
 */
var title = '';

var exportDatatable = {
    'columnDefs': [
        { type: 'date', targets: [9, 20, 22, 23, 26, 27] },
        { visible: false, searchable: true, targets: 0 }
    ],
    'select': true,
    'scrollX': true,
    'iDisplayLength': 10,
    'dom': '<"toolbar">lBfrtip',
    'buttons': [{
        extend: 'excelHtml5',
        footer: true,
        title: title,
        exportOptions: {
            columns: [9, 10, 11, 12, 13, 27]
        }
    }]
}


$(document).ready(function() {
    $('table').each(function() {
        var tableId = '#' + $(this).attr('id');
        setTable(tableId);
    });

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

        var table;
        if (tableId == '#osPytTable' || tableId == '#normalTable') {
            table = $(tableId).DataTable(exportDatatable);
            $("div.toolbar").html('<p class="title">Exported Excel file name: <input type="text"></p>');
            $('.dt-buttons').find('button').appendTo($('div.toolbar').find('p'));
        } else {
            table = $(tableId).DataTable({
                'columnDefs': [
                    { type: 'date', targets: [9, 20, 22, 23, 26, 27] },
                    { visible: false, searchable: true, targets: 0 }
                ],
                'select': true,
                'scrollX': true
            });
        }

        table.columns().every(function() {
            var that = this;
            $('input', this.footer()).on('keyup change', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });

        $(tableId).on('dblclick', 'tr td:not(.toggle, .edit, .date-edit)', function() {
            window.location = $(this).parent().data('href');
        });

        $('input').on('keypress', '.title', function() {
            console.log('hello')
        });
    }

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
        var preparer = row.data()[16] != '';
        var packed = row.data()[21] == 'Y';
        var emailed = row.data()[24] != '';
        var signed = row.data()[25] != '';
        var pyt = row.data()[26] != '' && row.data()[27] != '';
        console.log(preparer, packed, emailed, signed, pyt)

        if (!preparer) return '#noPreparerTable';
        if (emailed) {
            if (signed) {
                if (pyt) {
                    if (packed) {
                        return '#doneTable';
                    } else {
                        return '#emailedNotPackedTable';
                    }
                } else {
                    return '#osPytTable';
                }
            } else {
                return '#emailedTable';
            }
        } else {
            if (packed) {
                if (signed) {
                    if (pyt) {
                        return '#doneTable';
                    } else {
                        return '#osPytTable';
                    }
                } else {
                    return '#packedTable';
                }
            } else {
                return '#normalTable';
            }
        }
    }

    function moveRow(row, tableId) {
        if (!tableId) return;
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
        $(row).find('td').eq(9).addClass('date-edit');
        $(row).find('td').eq(16).addClass('edit');
        $(row).find('td').eq(18).addClass('edit');
        $(row).find('td').eq(19).addClass('edit');
        $(row).find('td').eq(20).addClass('date-edit');
        $(row).find('td').eq(21).addClass('toggle');
        $(row).find('td').eq(24).addClass('date-edit');
        $(row).find('td').eq(25).addClass('date-edit');
        $(row).find('td').eq(26).addClass('select');
        $(row).find('td').eq(27).addClass('edit');
        $(row).find('td').eq(28).addClass('date-edit');
        $(row).find('td').eq(33).addClass('edit');
    }
});