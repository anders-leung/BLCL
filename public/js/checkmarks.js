/**
 * Created by ander on 2017-09-14.
 */
$(document).ready(function() {
    $('.check').each(function() {
        var value = $(this).html();
        if (value == "true") {
            $(this).html('');
            $(this).append("<i class='fa fa-check' aria-hidden='true''></i>")
        } else {
            $(this).html('');
            $(this).append("<i class='fa fa-times' aria-hidden='true'></i>")
        }
    });
});