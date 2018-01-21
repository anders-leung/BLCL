/**
 * Created by ander on 2017-11-01.
 */
$(document).ready(function() {
    var table = $('table').DataTable({
        'iDisplayLength': 25,
        'select': true,
        'scrollX': false,
        'columnDefs' : [
            { type: 'date', targets: 1 },
            { visible: false, searchable: true, targets: 0 }
        ],

        drawCallback: function() {
            var api = this.api();
            var total = 0;
            api.columns().every(function(i) {
                if (i > 8) {
                    var sum = 0;
                    $('table tbody tr').each(function() {
                        var amount = $(this).find('td').eq(i - 1).html();
                        console.log(amount);
                        sum += parseFloat(amount == '' ? 0 : amount);
                    });
                    $(this.footer()).html(sum + '<br>-');
                    total += sum;
                    if (i == 13) $(this.footer()).html(sum + '<br>Total:');
                    if (i == 14) $(this.footer()).html(sum + '<br>' + total);
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