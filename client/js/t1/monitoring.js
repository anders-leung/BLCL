/**
 * Created by ander on 2017-06-06.
 */

function colorCells(row) {
    $(row).find('td:eq(7)').css('color', 'red');
    $(row).find('td:eq(8)').css('color', 'red');
    $(row).find('td:eq(19)').css('color', 'green');
    $(row).find('td:eq(24)').css('color', 'red');
    $(row).find('td:eq(25)').css('color', 'red');
    $(row).find('td:eq(26)').css('color', 'red');
    $(row).find('td:eq(27)').css('color', 'red');
    $(row).find('td:eq(28)').css('color', 'red');
    $(row).find('td:eq(29)').css('color', 'red');
}

function colorHeader(header) {
    if (header.index() == 7) header.css('color', 'red');
    if (header.index() == 8) header.css('color', 'red');
    if (header.index() == 19) header.css('color', 'green');
    if (header.index() == 24) header.css('color', 'red');
    if (header.index() == 25) header.css('color', 'red');
    if (header.index() == 26) header.css('color', 'red');
    if (header.index() == 27) header.css('color', 'red');
    if (header.index() == 28) header.css('color', 'red');
    if (header.index() == 29) header.css('color', 'purple');
}

var exportTables = ['normal', 'noPreparer', 'packed', 'osSigned', 'osPyt', 'emailedNotPacked'];

function exportDatatable(name) {
    var exportDatatable = {
        'columnDefs': [
            { type: 'date', targets: [9, 20, 24, 25, 30, 31, 32, 33] },
            { visible: false, searchable: true, targets: 0 }
        ],
        'select': true,
        'scrollX': true,
        rowCallback: function(row, data, index, full) {
            colorCells(row);
        },
        'iDisplayLength': 10,
        'dom': '<"toolbar">lBfrtip'
    }

    var columns = [10, 11, 12, 13, 14, 20, 22, 23, 24, 25];
    if (name == 'osSigned') {
        columns = [10, 11, 12, 13, 14, 20, 22, 23, 24, 26, 30];
    } else if (name == 'noPreparer') {
        columns = [8, 9, 10, 11, 12, 13, 14, 15, 16];
    } else if (name == 'normal') {
        columns = [3, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 20, 21, 22];
    } else if (name == 'packed') {
        columns = [3, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 20, 22];
    }

    var options = { year: 'numeric', month: 'short', day: 'numeric' };

    exportDatatable.buttons = [{
        extend: 'excelHtml5',
        filename: function() {
            return $('#' + name + 'Title').val() || (new Date()).toLocaleDateString('en-CA', options) + ' - ' + name;
        },
        exportOptions: {
            columns: columns
        }
    }]

    return exportDatatable;
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

        $(tableId + ' tfoot th').each( function (i) {
            // $(this).html(i);
            $(this).html( '<input type="text"/>' );
        });

        var table;
        var name = tableId.substring(1, tableId.length - 5);
        if (role == 'Administrator' && exportTables.includes(name)) {
            var title = name + 'Title';
            table = $(tableId).DataTable(exportDatatable(name));
            $('#' + name).find('div.toolbar').html('<p>Exported Excel file name: <input id="' + title + '" type="text"></p>');
            $('.dt-buttons').find('button').appendTo($('#' + name).find('div.toolbar').find('p'));
        } else {
            table = $(tableId).DataTable({
                'columnDefs': [
                    { type: 'date', targets: [9, 20, 28, 29, 30, 31] },
                    { visible: false, searchable: true, targets: 0 }
                ],
                'select': true,
                'scrollX': true,
                rowCallback: function(row, data, index, full) {
                    colorCells(row);
                }
            });
        }

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
    }

    var socket = io();

    socket.on('client side update', checkRows);

    function checkRows(data) {
        var row = getRow(data.id);
        console.log(data);
        var tableId = findTableForRow(row);
        if (tableId) moveRow(row, tableId);
    }

    function getRow(fileName) {
        var row;
        $('table').not('#doneTable, #allTable').each(function() {
            var table = $(this).DataTable();
            table.rows().every(function() {
                if (this.data()[0] == fileName) row = this;
            });
        });
        return row;
    }

    function findTableForRow(row) {
        var preparer = row.data()[16] != '';
        var packed = row.data()[22] == 'Y';
        var emailed = row.data()[30] != '';
        var signed = row.data()[29] != '';
        var pyt = row.data()[25] != '' && row.data()[26] != '' && row.data()[27] != '' && row.data()[28] != '';
        console.log(preparer, packed, emailed, signed, pyt)

        var table = ''
        if (!preparer) table = '#noPreparerTable';
        if (emailed) {
            if (signed) {
                if (pyt) {
                    if (packed) {
                        table = '#doneTable';
                    } else {
                        table = '#emailedNotPackedTable';
                    }
                } else {
                    table = '#osPytTable';
                }
            } else {
                table = '#emailedTable';
            }
        } else {
            if (packed) {
                if (signed) {
                    if (pyt) {
                        table = '#doneTable';
                    } else {
                        table = '#osPytTable';
                    }
                } else {
                    if (pyt) {
                        table = '#osSignedTable';
                    } else {
                        table = '#packedTable';
                    }
                }
            } else {
                table = '#normalTable';
            }
        }
        if (!table) table = '#missingTable';
        console.log('move to table ' + table)
        return table;
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

    // This is behind by 1
    function addClassesToRow(row, href) {
        var $row = $(row);
        $row.attr('data-href', href);
        $row.find('td').each(function() {
            $(this).addClass('text-nowrap');
        });
        $(row).find('td').eq(8).addClass('date-edit');
        $(row).find('td').eq(15).addClass('select admin initials');
        $(row).find('td').eq(16).addClass('select admin status');
        $(row).find('td').eq(17).addClass('select initials');
        $(row).find('td').eq(20).addClass('date-edit');
        $(row).find('td').eq(21).addClass('select toggle');
        $(row).find('td').eq(24).addClass('select initials');
        $(row).find('td').eq(25).addClass('select tax');
        $(row).find('td').eq(26).addClass('select pytType');
        $(row).find('td').eq(27).addClass('edit');
        $(row).find('td').eq(28).addClass('date-edit');
        $(row).find('td').eq(29).addClass('date-edit');
        $(row).find('td').eq(30).addClass('date-edit');
    }
});