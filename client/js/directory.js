$(document).ready(function() {
    var socket = io();

    $('table').css('width', '100%');
    $('table').DataTable({
        scrollX: true,
        scrollY: '70vh',
        paging: false,
        dom: '<"toolbar">frtip'
    }).on('dblclick', 'tr', function() {
        window.location = $(this).data('href');
    });

    $('div.toolbar').html('<p>See a client\'s info by double clicking on their respective row.</p>')

    $('td').addClass('text-nowrap');

    $(this).on('click', '.badge-danger', function () {
        var that = $(this);
        var tr = that.closest('tr');
        var href = tr.data('href');
        var tokens = href.split('/');
        var model = tokens[1];
        var id = tokens[tokens.length - 1];
        socket.emit('directory delete', { model, id });
    });
});