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
    var socket = io();

    var table = $('table').DataTable({
        'iDisplayLength': 10,
        'scrollX': true,
        'select': true,
        'dom': 'RlBfrtip',
        'columnDefs': [{ visible: false, searchable: false, targets: [0] }],
        'buttons': [{
            extend: 'excelHtml5',
            footer: true,
            title: function () {
                return `O/S Invoices From ${$('#company').val().toUpperCase()} on ${(new Date()).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}`;
            },
            exportOptions: {
                columns: ':visible'
            }
        }],

        drawCallback: function() {
            var api = this.api();
            api.columns({ 'filter': 'applied' }).every(function(i) {
                if (i > 2) {
                    var sum = 0;
                    var values = this.data();
                    for (var i = 0; i < values.length; i++) {
                        if (values[i]) {
                            values[i] = convert(values[i]);
                            sum += parseInt(values[i]);
                        }
                    }
                    $(this.footer()).html(convert(sum, true));
                }
            });
            $('table').DataTable().columns.adjust();
        }
    });
    
    $('table').on('dblclick', 'tr td:not(.edit, .date-edit, .select)', function() {
        var id = table.row(this).data()[0];
        window.location = `/invoice/invoice/${id}`;
    });

    table.columns().every(function(i) {
        if (i < 3) {
            $(this.footer()).html( '<input type="text"/>' );
            var that = this;
            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        }
    });
    
    $('#company').on('change', function() {
        socket.emit('invoice week change', {
            company: $(this).val()
        });
    });

    socket.on('update payments data', function(data) {
        table.clear();
        table.rows.add(data);
        table.draw();

        $('tr').each(function() {
            $('td').each(function() {
                $(this).addClass('text-nowrap');
            });
        });
    });
});