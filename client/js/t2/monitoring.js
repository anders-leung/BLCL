/**
 * Created by ander on 2017-12-04.
 */
$(document).ready(function() {
    var socket = io();

    socket.on('update t2', function (data) {
        var id = data.id;
        var field = data.field;
        var value = data.value;

        $('table').each(function () {
            var table = $(this).DataTable();
            var row = table.rows(`[data-href='/t2/client/${id}']`);
            if (row.data().length > 0) {
                row = table.row(row).index();
                var col = -1;
                TABLE.columns.map((column, i) => {
                    if (column.field === field) col = i;
                });
                console.log('row: ', row)
                console.log('col: ', col)
                table.cell(row, col).data(value);
                table.draw();
            }
        });
    });

    $('table').css('width', '100%');
    
    $('table').each(function () {
        $(this).find('tfoot th').each(function (i) {
            // $(this).html(i);
            $(this).html( '<input type="text"/>' );
        });

        var table = $(this).DataTable({
            scrollX: true,
            dom: '<"toolbar">frtip'
        }).on('dblclick', 'tr', function() {
            window.location = $(this).data('href');
        });

        table.columns().every(function() {
            var that = this;
            $('input', this.footer()).on('keyup change', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });
    });
});