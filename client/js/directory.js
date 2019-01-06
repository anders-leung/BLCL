$(document).ready(function() {
    $('table').DataTable({
        scrollY: '70vh',
        paging: false,
        dom: '<"toolbar">frtip'
    }).on('dblclick', 'tr', function() {
        window.location = $(this).data('href');
    });

    $('div.toolbar').html('<p>See a client\'s info by double clicking on their respective row.</p>')

    $('td').addClass('text-nowrap');
});