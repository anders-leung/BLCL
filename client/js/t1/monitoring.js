/**
 * Created by ander on 2017-06-06.
 */

function colorCells(row) {
    $(row).find('td').each(function (i) {
        var color = TABLE.columns[i].color;
        if (color) {
            $(this).css('color', color);
        }
    });
}

function colorHeader(header) {
    var color = TABLE.columns[header.index()].color;
    if (color) {
        header.css('color', color);
    }
}

var exportTables = ['normal', 'noPreparer', 'packed', 'osSigned', 'osPyt', 'emailedNotPacked'];

function exportDatatable(name) {
    var exportDatatable = {
        'columnDefs': [
            { type: 'date', targets: [9, 20, 24, 25, 30, 31, 32, 33] },
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
                    { type: 'date', targets: [9, 20, 28, 29, 30, 31] }
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

    socket.on('update t1', checkRows);

    function checkRows(data) {
        var row = getRow(data.id);
        var tableId = findTableForRow(row);
        var id = $(row.node()).closest('table').attr('id');
        if (tableId.includes(id)) return;
        if (tableId) moveRow(row, tableId);
    }

    function getRow(id) {
        var row;
        $('table').not('#doneTable, #allTable').each(function() {
            var table = $(this).DataTable();
            table.rows().every(function() {
                var href = $(this.node()).data('href');
                if (href && href.includes(id)) {
                    row = this;
                }
            });
        });
        console.log('getRows: ', row.data())
        return row;
    }

    function findTableForRow(row) {
        var data = row.data();
        var preparer, packed, emailed, received, tax, type, amount, signed;
        TABLE.columns.map((column, i) => {
            var value = data[i] != '';
            var header = column.header;
            switch (header) {
                case 'PRE':
                    return preparer = value;
                case 'Packed':
                    return packed = value;
                case 'Emailed to Si':
                    return emailed = value;
                case 'Rec\'d By':
                    return received = value;
                case 'Tax To CRA':
                    return tax = value;
                case 'PYT Type':
                    return type = value;
                case 'PYT Amount':
                    return amount = value;
                case 'Signed':
                    return signed = value;
                default:
                    return;
            }
        });
        var pyt = received && tax && type && amount;
        console.log(preparer, packed, emailed, signed, pyt)

        var table = ''
        if (!preparer) return '#noPreparerTable';
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

        $(row.node())
        var name = getName(row);
        var text = `${name} has been moved to <u>${tableId.substring(1, tableId.length - 5)} table</u>`;
        $(document).trigger('toast', text);

        console.log('about to remove the row');
        row.remove().draw();
    }

    function addClassesToRow(row, href) {
        row = $(row);
        row.attr('data-href', href);
        row.find('td').each(function(i) {
            var that = $(this);
            that.addClass('text-nowrap');

            var classes = TABLE.columns[i].classes;
            if (classes) {
                that.addClass(classes.join(' '));
            }
        });
    }

    // On 'tables/t1/monitoring.js' change
    function getName(row) {
        var data = row.data();
        var name = [];
        var names = ['Husband Last Name', 'Husband First Name', 'Wife Last Name', 'Wife First Name'];
        var indices = TABLE.columns.map((column, i) => {
            return names.includes(column.header) ? i : false;
        }).filter(index => index);
        
        indices.map((index) => {
            var value = data[index];
            value ? name.push(value) : '';
        });

        if (name.length === 4) {
            name[1] = `${name[1]} and ${name[2]}`;
        }

        return name.join(', ');
    }
});