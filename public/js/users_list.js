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
        }
    });

    $('table').DataTable({
        'paging': false,
        'filter': false,
        'info': false,
        'select': true,
        'scrollX': true,
        'scrollY': '65vh'
    });
});