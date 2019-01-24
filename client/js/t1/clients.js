/**
 * Created by ander on 2017-09-18.
 */

function colorCells(row) {
    $(row).find('td').each(function (i) {
        var color = TABLE.columns[i].color;
        if (color) {
            $(this).css('color', color);
        }
    });
}

function colorHeader(header) {
    var color = TABLE.columns[header.index()].color;
    if (color) {
        header.css('color', color);
    }
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
                { type: 'date', targets: [9, 19, 21, 22, 23] }
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

    socket.on('update t1', checkRows);

    function checkRows(data) {
        console.log('check rows: ', data);
        if (data.field === 'preparer') {
            if (data.value.toLowerCase() !== initials.toLowerCase()) {
                return removeRow(data);
            } else {
                return newClient(data);
            }
        }
        var row = getRow(data.id);
        if (!row) return;
        var tableId = findTableForRow(row);
        console.log('check rows tableId: ', tableId);
        if (tableId) moveRow(row, tableId);
    }

    function newClient(data) {
        var row = createClient(data.client);
        var tableId = findTableForRow(row);
        var table = $(tableId).DataTable();
        var rowNode = table.row.add(row).draw().node();
        addClassesToRow(rowNode, `/t1/client/${data.client.id}`);
        var name = data.client.name;
        var text = `${name} has been assigned to you in <u>${tableId}</u>`;
        $(document).trigger('toast', [text, true]);
    }

    function removeRow(data) {
        var row = getRow(data.id);
        if (row) {
            row.remove().draw();
            var name = data.client.name;
            $(document).trigger('toast', [`${name} has been assigned to another staff member`, true]);
        }
    }

    function getRow(id) {
        var row;
        $('table').each(function() {
            var table = $(this).DataTable();
            table.rows().every(function() {
                var href = $(this.node()).data('href');
                if (href && href.includes(id)) {
                    row = this;
                }
            });
        });
        return row;
    }

    function findTableForRow(row) {
        var data = row;
        if (row.data) data = row.data();
        var readyToPack, status, emailed;
        TABLE.columns.map((column, i) => {
            var value = data[i] != '';
            var header = column.header;
            switch (header) {
                case 'Ready To PRT/Pack':
                    return readyToPack = value;
                case 'PRE OK':
                    return status = data[i].toLowerCase();
                case 'Emailed to Si':
                    return emailed = value;
            }
        });

        if (!status) status = 'new';
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
        var name = getName(row);
        var text = `${name} has been moved to your <u>${tableId.substring(1, tableId.length - 5)} table</u>`;
        $(document).trigger('toast', [text]);
        row.remove().draw();
    }

    function addClassesToRow(row, href) {
        row = $(row);
        if (href) row.attr('data-href', href);
        row.find('td').each(function (i) {
            var classes = TABLE.columns[i].classes;
            if (classes) {
                $(this).addClass(classes.join(' '));
            }
            $(this).addClass('text-nowrap');
        });
    }

    function createClient(client) {
        var row = [];
        var husband = client.husband;
        var wife = client.wife;
        var husbandGst = husband ? husband.rental ? husband.rental.gstReturn : '' : '';
        var wifeGst = wife ? wife.rental ? wife.rental.gstReturn : '' : '';
        row.push(client.slips ? 'Y' : '');
        row.push(client.selfEmployed ? 'Y' : '');
        row.push(husbandGst || wifeGst ? 'Y' : '');
        row.push(husband ? husband.t1135 : '');
        row.push(wife ? wife.t1135 : '');
        row.push(client.rental ? 'Y' : '');
        row.push(client.t777 ? 'Y' : '');
        row.push(client.stocks ? 'Y' : '');
        row.push(client.new ? 'Y' : '');
        row.push(client.confirmPickupDate ? 'Y' : '');
        row.push(client.pickupDate);
        row.push(husband ? husband.lastName : '');
        row.push(husband ? husband.firstName : '');
        row.push(wife ? wife.lastName : '');
        row.push(wife ? wife.firstName : '');
        row.push(client.group);
        row.push(client.preparerRemarks);
        row.push(client.interviewer);
        row.push(client.preparer);
        row.push(client.preparerDone);
        row.push(client.checker);
        row.push(client.outstandingInfo);
        row.push(client.readyToPack);
        row.push(client.signed);
        row.push(client.emailed);
        row.push(client.interviewDate);
        row.push(client.tel ? client.tel.number : '');
        row.push(client.cell ? client.cell.number : '');
        row.push(client.email ? client.email.value : '');
        return row;
    }
    
    // On 'tables/t1/monitoring.js' change
    function getName(row) {
        var data = row.data();
        var name = [];
        var names = ['Husband Last Name', 'Husband First Name', 'Wife Last Name', 'Wife First Name'];
        var indices = TABLE.columns.map((column, i) => {
            return names.includes(column.header) ? i : false;
        }).filter(index => index);
        
        indices.map((index) => {
            var value = data[index];
            value ? name.push(value) : '';
        });

        if (name.length === 4) {
            name[1] = `${name[1]} and ${name[2]}`;
        }

        return name.join(', ');
    }
});