/**
 * Created by ander on 2017-09-18.
 */

function colorCells(row) {
    $(row).find('td:eq(7)').css('color', 'red');
    $(row).find('td:eq(8)').css('color', 'red');
    $(row).find('td:eq(19)').css('color', 'green');
    $(row).find('td:eq(21)').css('color', 'red');
}

function colorHeader(header) {
    if (header.index() == 7) header.css('color', 'red');
    if (header.index() == 8) header.css('color', 'red');
    if (header.index() == 19) header.css('color', 'green');
    if (header.index() == 21) header.css('color', 'red');
}

$(document).ready(function() {
    // function for setting up tables
    function setTable(tableId) {
        if (tableId == '#newTable') {
            $('.tab-pane').each(function (i) {
                if (i == 0) {
                    $(this).addClass('in');
                    $(this).addClass('active');
                }
            });
        }

        $(tableId + ' tfoot th').each( function (i) {
            var title = $(this).text();
            //$(this).html(i)
            $(this).html( '<input type="text"/>' );
        });

        var table = $(tableId).DataTable({
            'columnDefs': [
                { type: 'date', targets: [9, 19, 21, 22, 23] },
                { visible: false, searchable: true, targets: 0 }
            ],
            'select': true,
            'scrollX': true,
            rowCallback: function(row, data, index, full) {
                colorCells(row);
            },
        });

        table.columns().every(function() {
            var that = this;
            $('input', this.footer()).on('keyup change', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });

            colorHeader($(this.header()));
        });

        $(tableId).on('dblclick', 'tr td:not(.edit, .date-edit, .select)', function() {
            window.location = $(this).parent().data('href');
        });
    }

    $('table').each(function() {
        var tableId = '#' + $(this).attr('id');
        setTable(tableId);
    });

    var socket = io();

    socket.on('client side update', checkRows);
    socket.on('job assignment', addRow);

    function checkRows(data) {
        console.log(data);
        var row = getRow(data.fileName);
        if (!row) return;
        var tableId = findTableForRow(row);
        if (tableId) moveRow(row, tableId);
    }

    function addRow(data) {
        if (data.value.toLowerCase() != initials.toLowerCase()) return removeRow(data);
        data.client.preparer = data.value;
        var status = data.client.preparerDone;
        if (status == '') status = 'new';
        console.log(status);
        var table = $('#' + status.toLowerCase() + 'Table').DataTable();
        var rowNode = table.row.add(createRow(data.client)).draw().node();
        addClassesToRow(rowNode);
        $(rowNode).attr('data-href', data.client.pathName);
    }

    function removeRow(data) {
        var row = getRow(data.fileName);
        if (row) row.remove().draw();
    }

    function createRow(client) {
        var row = [];
        row.push(client.fileName);
        row.push(client.slips ? 'Y' : '');
        row.push(client.selfEmployed ? 'Y' : '');
        if (client.t1135 == 'N') {
            row.push('0');
        } else {
            row.push(client.t1135 == 'SIMPLE' ? '1' : '2');
        }
        row.push(client.rental ? 'Y' : '');
        row.push(client.t777 ? 'Y' : '');
        row.push(client.stocks ? 'Y' : '');
        row.push(client.new ? 'Y' : '');
        row.push(client.confirmPickUpDate ? 'Y' : '');
        row.push(client.pickupDate);
        row.push(client.husband ? client.husband.lastName : '');
        row.push(client.husband ? client.husband.firstName : '');
        row.push(client.wife ? client.wife.lastName : '');
        row.push(client.wife ? client.wife.firstName : '');
        row.push(client.group);
        row.push(client.interviewer);
        row.push(client.preparer);
        row.push(client.preparerDone);
        row.push(client.checker);
        row.push(client.readyToPack);
        row.push(client.outstandingInfo);
        row.push(client.emailed);
        row.push(client.signed);
        row.push(client.interviewDate);
        row.push(client.tel.number);
        row.push(client.cell.number);
        row.push(client.email.value);
        return row;
    }

    function getRow(fileName) {
        var row;
        $('table').each(function() {
            var table = $(this).DataTable();
            table.rows().every(function() {
                if (this.data()[0] == fileName) row = this;
            });
        });
        return row;
    }

    function findTableForRow(row) {
        var readyToPack = row.data()[19] != '';
        var status = row.data()[17] == '' ? 'new' : row.data()[17].toLowerCase();
        var emailed = row.data()[21] != '';

        if (readyToPack) return '#doneTable';
        if (emailed) return '#emailedTable';
        return '#' + status + 'Table';
    }

    function moveRow(row, tableId) {
        if (tableId == 'none') return row.remove().draw();
        var table = $(tableId).DataTable();
        var rowNode = table.row.add(row.data()).draw().node();
        var href = $(row.node()).attr('data-href');
        addClassesToRow(rowNode, href);
        row.remove().draw();
    }

    // jQuery down by 1 index
    function addClassesToRow(row, href) {
        var $row = $(row);
        if (href) $row.attr('data-href', href);
        $row.find('td').each(function() {
            $(this).addClass('text-nowrap');
        });
        $(row).find('td').eq(16).addClass('select status');
        $(row).find('td').eq(17).addClass('select initials');
        $(row).find('td').eq(18).addClass('date-edit');
        $(row).find('td').eq(20).addClass('date-edit');
        $(row).find('td').eq(21).addClass('date-edit');
    }
});