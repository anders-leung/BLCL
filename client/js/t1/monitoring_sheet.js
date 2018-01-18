/**
 * Created by ander on 2017-06-06.
 */
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

        var table = $(tableId).DataTable({
            'columnDefs': [
                { type: 'date', targets: [9, 20, 22, 23, 26, 27] },
                { visible: false, searchable: true, targets: 0 }
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

        $(tableId).on('dblclick', 'tr td:not(.toggle, .edit, .date-edit)', function() {
            window.location = $(this).parent().data('href');
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
        var packed = row.data()[21] == 'Y';
        var emailed = row.data()[22] != '';
        var signed = row.data()[23] != '';
        var pyt = row.data()[24] != '' && row.data()[25] != '';
        console.log(packed, emailed, signed, pyt)

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
                        return '#done';
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
        $(row).find('td').eq(8).addClass('date-edit');
        $(row).find('td').eq(15).addClass('edit');
        $(row).find('td').eq(17).addClass('edit');
        $(row).find('td').eq(18).addClass('edit');
        $(row).find('td').eq(19).addClass('date-edit');
        $(row).find('td').eq(20).addClass('toggle');
        $(row).find('td').eq(21).addClass('date-edit');
        $(row).find('td').eq(22).addClass('date-edit');
        $(row).find('td').eq(23).addClass('select');
        $(row).find('td').eq(24).addClass('edit');
        $(row).find('td').eq(25).addClass('date-edit');
        $(row).find('td').eq(30).addClass('edit');
    }
});