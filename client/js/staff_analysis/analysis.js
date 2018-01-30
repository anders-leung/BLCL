/**
 * Created by ander on 2017-09-14.
 */
$(document).ready(function() {
    $('.nav-tabs a').each(function(i) {
        if (i == 0) {
            $(this).addClass('active');
            return;
        }
    });

    $('.tab-pane').each(function(i) {
        if (i == 0) {
            $(this).addClass('in');
            $(this).addClass('active');
            return;
        }
    });

    $('table').each(function() {
        var tableId = '#' + $(this).attr('id');
        if (tableId == '#normalTable') {
            $('.tab-pane').each(function (i) {
                if (i == 0) {
                    $(this).addClass('in');
                    $(this).addClass('active');
                }
            });
        }

        $(tableId + ' tfoot th').each( function () {
            var title = $(this).text();
            $(this).html( '<input type="text"/>' );
        });

        var table = $(tableId).DataTable({
            'scrollX': true,
            'select': true,
            'columnDefs': [
                { targets : 14, type : 'date' },
                { targets : 0, visible : false, searchable : true }
            ],

            drawCallback: function() {
                var api = this.api();
                api.columns({ 'filter': 'applied' }).every(function(i) {
                    if (i == 14) {
                        var sum = this.data().sum();
                        $(this.footer()).html(sum)
                    } else if (i > 5) {
                        var count = 0;
                        var data = this.data();
                        for (var i = 0; i < data.length; i++) {
                            if (data[i] != '') count++;
                        }
                        $(this.footer()).html(count);
                    }
                });
            }
        });

        table.columns().every(function() {
            var that = this;
            $('input', this.footer()).on('keyup change', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });

        $(tableId).on('dblclick', 'tr td:not(.toggle, .edit, .date-edit)', function() {
            window.location = $(this).parent().data('href');
        });
    });
});