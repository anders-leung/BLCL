/**
 * Created by ander on 2017-11-18.
 */
$(document).on('keyup', function(e) {
    if (e.which == 27) {
        var table = $('table').DataTable();
        table.rows().every(function (i) {
            if (this.data()[0] == '') {
                table.row(i).remove().draw();
            }
        });
        $('button').prop('disabled', false);
    }
});

$(document).ready(function() {
    var socket = io();

    $('table').DataTable({
        'paging': false,
        'aaSortingFixed': [[0, 'asc']]
    });

    $(document).on('click', '#addUser', function(e) {
        postUser($(e.target).closest('tr'));
    });

    function postUser(row) {
        var table = $('table').DataTable();
        var index;
        table.rows().every(function(i) {
            if (this.data()[0] == '') {
                index = i;
            }
        });
        var data = [];
        $(row).find('td').each(function(i) {
            var value = $(this).children().val();
            data.push(value);
            table.cell(index, i).data(value);
        });
        table.draw();

        $('#addUser').prop('disabled', false);

        socket.emit('add user', {
            user: data
        });
    }

    $('#addUser').on('click', function() {
        $(this).prop('disabled', true);
        var table = $('table').DataTable();
        var row = table.row.add(['', '', '', '']).draw().node();
        $(row).find('td').each(function(i) {
            if (i == 2) {
                var select = "<select>";
                var options = roles.roles;
                for (var j = 0; j < options.length; j++) {
                    var option = "<option value='" + options[j] + "'";
                    if (options[j] == 'Employee') {
                        option += " selected";
                    }
                    option += ">" + options[j] + "</option>";
                    select += option;
                }
                select += "</select>";
                select = $(select);
                $(this).html(select);
            } else {
                var input = "<input type='text'>";
                $(this).html(input);
            }
            if (i == 3) {
                var button = "<button id='addUser' class='btn btn-success pull-right' style='padding : 0 5px 0 5px'>+</button>"
                $(this).append(button);
            }
        });
    });
});