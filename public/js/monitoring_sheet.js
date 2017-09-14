/**
 * Created by ander on 2017-06-06.
 */

function getAttribute(column_number) {
    if (column_number == 10) {
        return 'pickedUp';
    } else if (column_number == 19) {
        return 'preparerDone';
    } else if (column_number == 21) {
        return 'checkerDone';
    } else if (column_number == 23) {
        return 'readyForPickup';
    } else if (column_number == 25) {
        return 'pickupOk';
    } else if (column_number == 26) {
        return 'pytReceived';
    } else if (column_number == 28) {
        return 'prcLastYear';
    }
    return null;
}

function toggleSpan(span) {
    if ($(span).hasClass('fa-check')) {
        $(span).removeClass('fa-check');
        $(span).addClass('fa-times');
        return false;
    } else {
        $(span).removeClass('fa-times');
        $(span).addClass('fa-check');
        return true;
    }
}

function inputToHtml(input, inputType) {
    var value = $(input).val();
    var cell = $(input).parent();
    if (inputType == "date-edit") {
        $(cell).toggleClass('date-edit');
    } else {
        $(cell).toggleClass('edit)');
    }
    cell.html(value);
    resetTable();
}

function getScroll() {
    var left = $(window).scrollLeft();
    var down = $(window).scrollTop();
    return left + ',' + down;
}

function setTable() {
    $('table').DataTable({
        'paging': false,
        'info': false,
        'select': true,
        'scrollX': true,
        'scrollY': '65vh'
    });
}

function resetTable() {
    $('table').dataTable().destroy();
    setTable();
}

$(document).ready(function() {
    setTable();

    if (scroll) {
        $(window).scrollLeft(parseInt(scroll.split(',')[0]));
        $(window).scrollTop(parseInt(scroll.split(',')[1]));
    }

    $('tr td').not('.toggle, .edit, .date-edit').dblclick(function() {
        window.location = $(this).parent().data('href');
    });

    $('.toggle').click(function() {
        var value = $(this).find('span');
        var pathName = $(this).parent().data('href').split('/')[2];
        var col = $(this).parent().children().index($(this));
        var attr = getAttribute(col);
        var info = pathName + ',' + attr + ',' + toggleSpan($(this).find('span')) + ',' + getScroll();
        $('#post').val(info);
        $('#submit').trigger('click');
    });

    $('.edit').click(function(e) {
        var value = $(this).html();
        var input = $("<input class='form-control' type='text' onfocusout='inputToHtml(this, \"" + 'edit' + "\")' value='" + value + "'>");
        $(this).html(input);
        $(this).toggleClass('edit');
        $(input).focus();
        var length = $(input).val().length;
        var target = e.target.firstChild;
        target.setSelectionRange(length, length);
    });

    $('.edit, .date-edit').keypress(function(e) {
        if (e.which == 13) {
            inputToHtml($(this).find('input'), $(e.target));
            return false;
        }
    });

    $('.date-edit').click(function(e) {
        var value = $(this).html();
        var date = $("<input class='form-control' type='date' onfocusout='inputToHtml(this, \"" + 'date-edit' + "\")' value='" + value + "'>");
        $(this).html(date);
        $(date).focus();
        $(this).toggleClass('date-edit');
    });
});