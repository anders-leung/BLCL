$(document).ready(function() {
    $('td').addClass('text-nowrap');

    $('table').each(function() {
        var tableId = '#' + $(this).attr('id');
        setTable(tableId);
    });

    // function for setting up tables
    function setTable(tableId) {
        $(tableId + ' tfoot th').each( function (i) {
            //$(this).html(i);
            $(this).html( '<input type="text"/>' );
        });

        var table = $(tableId).DataTable({
            'columnDefs': [
                { visible: false, searchable: true, targets: 0 }
            ],
            'select': true
        });

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
    socket.on('nr get response', function(data) {
        if (data.user == user) {
            updateTables(data.clients);
        }
    })
});