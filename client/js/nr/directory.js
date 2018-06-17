$(document).ready(function() {
    $('table').DataTable({
        scrollY: '70vh',
        paging: false
    }).on('dblclick', 'tr', function() {
        window.location = $(this).data('href');
    });
});