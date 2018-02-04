/**
 * Created by ander on 2017-11-01.
 */

$(document).ready(function() {
    var table = $('table').DataTable({
        'iDisplayLength': 10,
        'select': true,
        'scrollX': false,
        'columnDefs' : [
            { type: 'date', targets: 1 },
            { visible: false, searchable: true, targets: 0 }
        ],
        'dom': 'lBfrtip',
        'buttons': [{
            extend: 'excelHtml5',
            footer: true,
            title: new Date().toISOString().slice(0,10) + ' Payments',
            exportOptions: {
                columns: 'visible'
            }
        }],

        drawCallback: function() {
            var api = this.api();
            var total = 0;
            api.columns({ 'filter': 'applied' }).every(function(i) {
                if (i > 8) {
                    var sum = this.data().sum();
                    $(this.footer()).html(sum)
                    total += sum;
                    if (i == 15) $(this.footer()).html(total);
                }
            });
        }
    });

    table.columns().every(function(i) {
        if (i < 9) {
            $(this.footer()).html( '<input type="text"/>' );
            var that = this;
            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        }
    });
});