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

            api.columns().every(function(i) {
                if (i > 6) {
                    var sum = 0;
                    $('table tbody tr').each(function() {
                        var amount = $(this).find('td').eq(i).html();
                        sum += parseFloat(amount == '' ? 0 : amount);
                    });
                    $(this.footer()).html(sum)
                }
            });
        }
    });
});