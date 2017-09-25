/**
 * Created by ander on 2017-09-18.
 */

statuses = statuses.split(",");

$(document).ready(function() {
    var socket = io();

    function updateHtml(cell, value) {
        $(cell).html(value);
        $(cell).find('select').toggle();
        $(cell).on('click', showInput);

        $('table').DataTable().cell($(cell)).data(value);

        var row = $(cell).closest('tr');
        var phone_number = $(row).find('td:nth-child(2)').html();
        socket.emit('done preparing', {
            phone_number: phone_number,
            value: value
        });
    }

    function showInput(e) {
        var cell = e.target;
        var value = $(cell).html();
        var select = "<select>";
        for (var i = 0; i < statuses.length; i++) {
            var option = "<option value='" + statuses[i] + "'";
            if (statuses[i] == value) {
                option += " selected";
            }
            option += ">" + statuses[i] + "</option>";
            select += option;
        }
        select += "</select>";
        select = $(select);
        $(cell).html(select);

        $(select).focusout(function() {
            updateHtml($(this).parent(), $(this).val());
        });

        $(cell).off('click', showInput);
    }

    $('.status').on('click', showInput);

    $('table').DataTable({
        'paging': false,
        'select': true,
        'scrollX': true,
        'scrollY': '60vh'
    });
});