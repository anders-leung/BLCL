/**
 * Created by ander on 2017-06-06.
 */
function getField(column) {
    var header = $('thead tr').find('th:nth-child(' + column + ')').html();

    switch (header) {
        case 'Picked Up':
            return 'pickedUp';
        case 'Preparer Done':
            return 'preparerDone';
        case 'Checker Done':
            return 'checkerDone';
        case 'Outstanding Info':
            return 'outstandingInfo';
        case 'Remarks':
            return 'remarks';
        case 'Ready for Pickup':
            return 'readyForPickup';
        case 'Call Date':
            return 'callDate';
        case 'Pickup OK':
            return 'pickupOk';
        case 'PYT Received':
            return 'pytReceived';
        case 'Things to do After Pickup':
            return 'thingsToDo';
        case 'PRC Last Year':
            return 'prcLastYear';
    }
}

function setTable() {
    $('table tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" />' );
    } );

    var table = $('table').DataTable({
        'paging': false,
        'select': true,
        'scrollX': true,
        'scrollY': '55vh',
        'language': {
            'info': '_TOTAL_ clients'
        }
    });

    // Apply the search
    table.columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
}

function resetTable() {
    $('table').DataTable().destroy();
    setTable();
}

$(document).ready(function() {
    var socket = io();

    socket.on('done preparing', preparerEvent);
    socket.on('monitoring sheet update', updateEvent);

    function preparerEvent(data) {
        var row = $('td').filter(function() {
            return $(this).html() == data.phone_number;
        }).closest('tr');

        var cell = $(row).find('td:nth-child(20)');
        $(cell).html(data.value);
        var table = $('table').DataTable();
        table.cell($(cell)).data(data.value);
    }

    function updateEvent(data) {
        updateHtml(data.row, data.column, data.value, data.type);
    }

    function updateHtml(row, column, value, type, emit) {
        var rowHtml = $('tbody tr').eq(row);
        var cell = $(rowHtml).find('td:nth-child(' + column + ')');

        $(cell).on('click', showInput);

        var table = $('table').DataTable();

        if (typeof(value) === 'boolean') {
            var i = $(cell).find('i');
            i.toggleClass('fa-check');
            i.toggleClass('fa-times');
        } else {
            if (type == 'date') {
                $(cell).toggleClass('date-edit');
            } else if (type == 'edit') {
                $(cell).toggleClass('edit)');
            }
            cell.html(value);
            table.cell($(cell)).data(value);
        }

        if (!emit) { return; }

        var phone_number = $(rowHtml).find('td:nth-child(2)').html();
        var field = getField(column);
        socket.emit('monitoring sheet update', {
            row: row,
            column: column,
            type: type,
            phone_number: phone_number,
            field: field,
            value: value
        });
    }

    function assignJobs() {
        $('tbody tr').each(function() {
            var phone_number = $(this).find('td:nth-child(' + 2 + ')').html();
            var preparer = $(this).find('td:nth-child(' + 19 + ')').html();
            socket.emit('assigning jobs', {
                phone_number: phone_number,
                preparer: preparer
            });
        });
    }

    setTable();

    $('tr td').not('.toggle, .edit, .date-edit').dblclick(function() {
        window.location = $(this).parent().data('href');
    });

    $('#assignJobs').click(function() {
        assignJobs();
    });

    $('.toggle').click(function() {
        var column = $(this).index();
        var row = $(this).closest('tr').index();
        var check = $(this).find('i');
        var value = true;
        if ($(check).hasClass('fa-check')) {
            value = false;
        }
        updateHtml(row, column + 1, value, null, true);
    });

    function showInput(e) {
        var cell = e.target;
        var value = $(this).html();
        var input = $("<input type='text' value='" + value + "'>");
        $(this).html(input);
        $(this).toggleClass('edit');
        $(input).focus();
        var length = $(input).val().length;
        var target = e.target.firstChild;
        target.setSelectionRange(length, length);

        $(cell).off('click', showInput);
    }

    $('.edit').on('click', showInput);

    $('.edit, .date-edit').keypress(function(e) {
        if (e.which == 13) {
            var column = $(this).index();
            var row = $(this).closest('tr').index();
            var value = $(this).find('input').val();
            var type = 'edit';
            if (column == 25) {
                type = 'date-edit';
            }
            updateHtml(row, column + 1, value, type, true);
            return false;
        }
    });

    $('.date-edit').click(function(e) {
        var value = $(this).html();
        var date = $("<input type='date' value='" + value + "'>");
        $(this).html(date);
        $(date).focus();
        $(this).toggleClass('date-edit');
    });
});