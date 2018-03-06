/**
 * Created by ander on 2017-11-22.
 */
var is_administrator = role == 'Administrator';
var cell_being_edited;
var previousValue;

// Adjust tables so columns are of correct width when DOM is dynamically modified
function adjustTables() {
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
}

$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    adjustTables();
});

// Disable clicks for all tables to prevent editing
function disableEditing(table) {
    $('table').each(function() {
        $(this).off('click');
    });
}

function hasPermission(cell) {
    if ($(cell).hasClass('admin')) return is_administrator;
    return true;
}

$(document).ready(function() {
    enableEditing();

    $('table').each(function() {
        $(this).on('enableEditing', '.edit, .date-edit, .select', function() {
            console.log('enableEditing')
            enableEditing();
            cell_being_edited = null;
        });
    });

    // Enable editing for any of the tds
    function enableEditing() {
        $('table').each(function() {
            $(this).on('click', '.edit', showTextInput);
            $(this).on('click', '.date-edit', showDateInput);
            $(this).on('click', '.select', showSelect);
        });
    }

    $(document).on('keyup', function(e) {
        if (e.which == 27) {
            if (!cell_being_edited) return;
            $(cell_being_edited).html(previousValue);
            cell_being_edited = null;
            enableEditing();
            adjustTables();
        }
    });

    // Show text input on click of td
    function showTextInput(e) {
        var cell = e.target;
        if (!hasPermission(cell)) return;

        cell_being_edited = cell;
        var value = $(this).html();
        previousValue = value;

        var input = $("<input type='text' value='" + value + "'>");
        $(this).html(input);
        $(input).focus();
        var length = $(input).val().length;
        var target = e.target.firstChild;
        target.setSelectionRange(length, length);

        var table = $(cell).closest('table');
        disableEditing();
        adjustTables()
    }

    // Show datepicker input on click of td
    function showDateInput(e) {
        var cell = e.target;
        if (!hasPermission(cell)) return;

        cell_being_edited = cell;
        var value = $(this).html();
        previousValue = value;

        var date = $("<input type='text' class='datepicker' value='" + value + "'>");
        $(this).html(date);
        $(date).focus();

        var table = $(cell).closest('table');
        disableEditing();
        adjustTables();
    }

    // Show select drowpdown on click of td
    function showSelect(e) {
        var cell = e.target;
        if (!hasPermission(cell)) return;

        cell_being_edited = cell;
        var value = $(this).html();
        previousValue = value;

        for (var key in options) {
            if ($(cell).hasClass(key)) var selectOptions = options[key];
        }

        var select = "<select>";
        for (var i = 0; i < selectOptions.length; i++) {
            var option = "<option value='" + selectOptions[i] + "'";
            if (selectOptions[i] == value) {
                option += " selected";
            }
            option += ">" + selectOptions[i] + "</option>";
            select += option;
        }
        select += "</select>";
        select = $(select);
        $(cell).html(select);

        disableEditing();
        adjustTables();
    }
});