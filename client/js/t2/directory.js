/**
 * Created by ander on 2018-01-13.
 */
$(document).ready(function() {
    $('table').DataTable({
        scrollY: '70vh',
        paging: false
    }).on('dblclick', 'tr', function() {
        window.location = $(this).data('href');
    });
});