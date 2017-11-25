/**
 * Created by ander on 2017-10-27.
 */
$(document).ready(function() {
    $('form').submit(function() {
        $(this).find('#submit').prop('disabled', true);
        $('#submit').val('Setting up T1 Directory...')
    })
});