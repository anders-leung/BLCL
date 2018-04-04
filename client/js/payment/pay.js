/**
 * Created by ander on 2017-11-01.
 */
function convert(value, int) {
    if (int) {
        var s = value.toString();
        if (s.length < 3) {
            var integer = '0';
            if (s.length == 2) {
                var decimal = s;
            } else if (s.length == 1) {
                var decimal = '0' + s;
            }
        } else {
            var integer = s.substring(0, s.length - 2);
            var decimal = s.substring(s.length - 2, s.length);
        }
        return integer + '.' + decimal;
    } else {
        var tokens = value.split('.');
        return tokens[0] + tokens[1];
    }
}

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
            title: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) + ' Payments',
            exportOptions: {
                columns: ':visible'
            }
        }],

        drawCallback: function() {
            var api = this.api();
            var total = 0;
            api.columns({ 'filter': 'applied' }).every(function(i) {
                if (i == 15) {
                    $(this.footer()).html(convert(total, true));
                } else if (i > 8) {
                    var sum = 0;
                    var values = this.data();
                    for (var i = 0; i < values.length; i++) {
                        if (values[i]) {
                            values[i] = convert(values[i]);
                            sum += parseInt(values[i]);
                        }
                    }
                    $(this.footer()).html(convert(sum, true));
                    total += sum;
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