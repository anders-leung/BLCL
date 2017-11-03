/**
 * Created by ander on 2017-09-18.
 */
function getFileName(row) {
    var husbandLastName = $(row).find('td:nth-child(12)').html();
    var husbandFirstName = $(row).find('td:nth-child(13)').html();
    var wifeLastName = $(row).find('td:nth-child(14)').html();
    var wifeFirstName = $(row).find('td:nth-child(15)').html();

    var fileName = '';

    if (husbandFirstName) {
        fileName += husbandLastName + ', ' + husbandFirstName;
        if (wifeFirstName) {
            fileName += ' and ';
            fileName += wifeLastName + ', ' + wifeFirstName;
        }
    } else {
        fileName += wifeLastName + ', ' + wifeFirstName;
    }
    return fileName;
}

function adjustTables() {
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
}

function disableEditing() {
    $('#table').off('click');
}

statuses = statuses.split(",");

$(document).ready(function() {
    var previousValue;
    var socket = io();

    function enableEditing() {
        var table = $('#table');
        table.on('click', '.edit', showInput);
        table.on('click', '.status', showStatusInput);
    }

    function updateHtml(cell, value, type) {
        $(cell).html(value);
        enableEditing();

        $('table').DataTable().cell($(cell)).data(value);

        var field = 'checker';
        if (type == 'select') {
            field = 'preparerDone';
            $(cell).find('select').toggle();
        }

        var row = $(cell).closest('tr');
        var fileName = getFileName(row);
        socket.emit('done preparing', {
            field: field,
            fileName: fileName,
            value: value
        });

        adjustTables();
    }

    function showStatusInput(e) {
        var cell = e.target;
        var value = $(cell).html();
        previousValue = value;
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

        $(select).focus();

        $(select).on('change', function() {
            updateHtml($(this).parent(), $(this).val(), 'select');
        });

        disableEditing();
        adjustTables();
    }

    function showInput(e) {
        console.log('showInput called')
        var value = $(this).html();
        previousValue = value;
        var input = $("<input type='text' value='" + value + "'>");
        $(this).html(input);
        $(input).focus();
        var length = $(input).val().length;
        var target = e.target.firstChild;
        target.setSelectionRange(length, length);

        disableEditing();
        adjustTables()
    }

    enableEditing();

    $('#table').on('keypress', '.edit', function(e) {
        if (e.which == 13) {
            var value = $(this).find('input').val();
            updateHtml(this, value);
        }
    }).on('keyup', '.status, .edit', function(e) {
        if (e.which == 27) {
            $(this).html(previousValue);
            enableEditing();
            adjustTables();
        }
    }).on('focusout', '.edit', function() {
        var value = $(this).find('input').val();
        updateHtml(this, value);
    });

    $('table').DataTable({
        'paging': false,
        'select': true,
        'scrollX': true,
        'scrollY': '60vh'
    });
});