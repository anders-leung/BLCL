/**
 * Created by ander on 2017-12-04.
 */
$(document).ready(function() {
    $('table').css('width', '100%');
    $('table').DataTable({
        scrollX: true,
        dom: '<"toolbar">frtip'
    }).on('dblclick', 'tr', function() {
        window.location = $(this).data('href');
    });
});