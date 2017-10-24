/**
 * Created by ander on 2017-09-14.
 */
$(document).ready(function() {
    var table = $('table').DataTable();
    $('.check').each(function() {
        var value = $(this).html();
        if (value == "true") {
            table.cell($(this)).data('Y');
        } else {
            table.cell($(this)).data('N');
        }
    });
});