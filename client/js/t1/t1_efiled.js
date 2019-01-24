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
        if (tableId == '#t1Table') {
            $('.tab-pane').each(function (i) {
                if (i == 0) {
                    $(this).addClass('in');
                    $(this).addClass('active');
                }
            });
        }

        $(tableId + ' tfoot th').each( function (i) {
            //$(this).html(i);
            $(this).html( '<input type="text"/>' );
        });

        var name = tableId.substring(1, tableId.length - 5);
        var options = { year: 'numeric', month: 'short', day: 'numeric' };
        var table = $(tableId).DataTable({
            'columnDefs': [
                { type: 'date', targets: [7, 8, 9, 10] },
            ],
            'select': true,
            'dom': '<"toolbar">lBfrtip',
            'buttons': [{
                extend: 'excelHtml5',
                filename: function() {
                    return $('#' + name + 'Title').val() || (new Date()).toLocaleDateString('en-CA', options) + ' - ' + name;
                },
                exportOptions: {
                    columns: ':visible'
                }
            }]
        });
        
        if (role == 'Administrator') {
            var title = name + 'Title';
            $('#' + name).find('div.toolbar').html('<p>Exported Excel file name: <input id="' + title + '" type="text"></p>');
            $('.dt-buttons').find('button').appendTo($('#' + name).find('div.toolbar').find('p'));
        }

        table.columns().every(function() {
            var that = this;
            $('input', this.footer()).on('keyup change', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });

        $(tableId).on('dblclick', 'tr td:not(.edit, .date-edit, .select)', function() {
            window.location = $(this).parent().data('href');
        });
    }

    var socket = io();

    socket.on('update t1', checkRows);

    function checkRows(data) {
        var row = getRow(data.id);
        console.log(data);
        var tableId = findTableForRow(row);
        var originalTable = $(row.node()).closest('table').attr('id');
        if (tableId.includes(originalTable)) return;
        if (tableId) moveRow(row, tableId);
    }

    function getRow(id) {
        var row;
        $('table').each(function() {
            var table = $(this).DataTable();
            table.rows().every(function() {
                var href = $(this.node()).attr('data-href');
                if (href && href.includes(id)) {
                    row = this;
                }
            });
        });
        return row;
    }

    function findTableForRow(row) {
        var data = row.data();
        var husband = !data[4] || data[9];
        var wife = !data[5] || data[10];
        var t1Efiled = husband && wife;

        if (t1Efiled) {
            return '#doneTable'
        } else {
            return '#t1Table';
        }
    }

    function moveRow(row, tableId) {
        if (!tableId) return;
        if (tableId == 'none') return row.remove().draw();
        var table = $(tableId).DataTable();

        var rowNode = table.row.add(row.data()).draw().node();
        var href = $(row.node()).attr('data-href');
        addClassesToRow(rowNode, href);
        
        var name = getName(row);
        var text = `${name} has been moved to <u>${tableId.substring(1, tableId.length - 5)} table</u>`;
        $(document).trigger('toast', text);

        row.remove().draw();
    }

    function addClassesToRow(row, href) {
        row = $(row);
        row.attr('data-href', href);
        row.find('td').each(function(i) {
            var classes = TABLE.columns[i].classes;
            if (classes) {
                $(this).addClass(classes.join(' '));
            }
            $(this).addClass('text-nowrap');
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