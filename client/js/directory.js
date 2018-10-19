$(document).ready(function() {
    console.log('hello')
    $('table').DataTable({
        scrollY: '70vh',
        paging: false
    }).on('dblclick', 'tr', function() {
        window.location = $(this).data('href');
    });
});