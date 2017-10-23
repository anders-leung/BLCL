/**
 * Created by ander on 2017-09-14.
 */

$(document).ready(function() {
    var socket = io();

    socket.on('assigning jobs', assignJob);
    socket.on('done preparing', statusUpdate);

    function assignJob(data) {
        var div = $('#' + data.preparer);
        var table = $(div).find('table').DataTable();

        table.row.add([
            data.client.husband.lastName,
            data.client.husband.firstName,
            data.client.wife.lastName,
            data.client.wife.firstName,
            data.client.slips,
            data.client.selfEmployed,
            data.client.t1135,
            data.client.rental,
            data.client.stocks,
            data.client.new,
            data.client.pickedUp
        ]).draw();
    }

    function statusUpdate(data) {
        var div = $('#' + data.preparer);
        var table = $(div).find('table').DataTable();

        table.rows().filter(function(rowIndex) {
            if (table.cell(rowIndex, 0).data() === data.phone_number) {
                table.cell(rowIndex, 12).data(data.value).draw();
            }
        });
    }

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
            return;
        }
    });

    $('table').DataTable({
        'paging': false,
        'filter': false,
        'info': false,
        'select': true,
        'scrollY': '65vh',
        'columnDefs': [{
            'targets': [0],
            'visible': false,
            'searchable': true
        }]
    });
});