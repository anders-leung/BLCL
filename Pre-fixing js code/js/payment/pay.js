/**
 * Created by ander on 2017-11-01.
 */
$(document).ready(function() {
    var table = $('table').DataTable({
        'select': true,
        'scrollX': true,
        'scrollY': '55vh',

        drawCallback: function() {
            var api = this.api();

            api.columns().every(function(i) {
                if (i > 6) {
                    var sum = this.data().sum();
                    $(this.footer()).html(sum)
                }
            });
        }
    });
});