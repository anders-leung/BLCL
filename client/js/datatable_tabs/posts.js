var service, page;

var headersToFields = {
    'PRE OK' : 'preparerDone',
    'Pickup Date' : 'pickupDate',
    'PRE' : 'preparer',
    'CKR' : 'checker',
    'Outstanding Info' : 'outstandingInfo',
    'Ready To PRT/Pack' : 'readyToPack',
    'Packed' : 'packed',
    'Emailed' : 'emailed',
    'Signed' : 'signed',
    'PYT Type' : 'pytReceived',
    'PYT Amount' : 'pytAmount',
    'Rec\'d By' : 'recBy',
    'Tax To CRA' : 'taxToCRA',
    'T1135 EFILED' : 't1Efiled',
    'GST EFILED' : 'gstEfiled',
    'Email/Call Pu' : 'callDate',
    'Remarks' : 'remarks',
    'Sign Date': 'signDate',
    'My Remarks': 'preparerRemarks',
    'T1e Remarks': 't1Remarks',
    'GSTe Remarks': 'gstRemarks',
};

function adjustTables() {
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
}

function getField(cell) {
    return TABLE[$(cell).index()].field;
    var header;
    $('table').first().find('thead tr th').each(function(index) {
        if ($(cell).index() == index) header = $(this).html();
    });
    var field = headersToFields[header];
    if (!field) return header.toLowerCase();
    return field;
}

function getColumn(field) {
    var column = -1;
    TABLE.map((col, index) => {
        if (col.field === field) {
            column = index;
        }
    });
    console.log('column: ', column)
    return column;
    var columnIndex = -1;
    for (var header in headersToFields) {
        if (headersToFields[header] == field) {
            $('table').first().find('thead tr th').each(function(index) {
                if ($(this).html() == header) columnIndex = index;
            });
        }
    }

    if (columnIndex == -1) {
        $('table').find('thead tr th').each(function(index) {
            var header = field.charAt(0).toUpperCase() + field.slice(1);
            if ($(this).html() == header) columnIndex = index;
        });
    }
    return columnIndex;
}

$(document).ready(function() {
    var socket = io();

    var uri = window.location.pathname;
    var uriTokens = uri.split('/');
    service = uriTokens[1];
    page = uriTokens[2];
    if (uriTokens.length > 3) return;

    socket.on('update t1', updateHtml);

    $('table').each(function() {
        if (window.location.pathname.includes('/nr')) return;
        $(this).on('keypress', '.edit', function(e) {
            if (e.which == 13) {
                saveEdits(this, 'input');
            }
        });

        $(this).on('focus', '.datepicker', function() {
            $(this).datepicker({
                dateFormat: 'yy-M-dd',
                onSelect: function() {
                    var td = $(this).parent();
                    if ($(td).find('input').length === 0) {
                        return;
                    }
                    saveEdits(td, 'input');
                    $(this).datepicker('hide');
                }
            });
        });

        $(this).on('change', '.select', function() {
            saveEdits(this, 'select');
        });
    });

    function saveEdits(that, type) {
        var cell = $(that).closest('td');
        var row = $(that).closest('tr');
        var id = row.attr('data-href').split('/')[3];
        var value = $(that).find('input').val();
        if (type == 'select') value = $(that).find('select').val();
        var field = getField(cell);
        updateHtml({ id, field, value }, true);
        $(that).trigger('enableEditing');
    }

    function updateHtml(data, emit) {
        const { id, field, value } = data;
        console.log('data: ', data)
        if (pathIncludes('nr')) return;
        var column = getColumn(field);
        console.log(column);
        console.log('value: ', value)
        var rows = $('tr').filter(function () {
            var href = $(this).data('href');
            return href && href.includes(id);
        });
        rows.each(function () {
            var that = $(this);
            var table = that.closest('table').DataTable();
            table.rows().every(function (row) {
                var href = $(this.node()).data('href');
                if (href && href.includes(id)) {

                    table.cell(row, column).data(value);
                }
            });
        });
        adjustTables();

        if (!emit) return;

        let event = 'update t1';

        if (pathIncludes('manage_users')) {
            event = 'update user';
        } else if (pathIncludes('invoice')) {
            event = 'update invoice';
        } else if (pathIncludes('t2')) {
            event = 'update t2';
        }

        console.log('event: ', event)
        console.log('emit: ', data)
        socket.emit(event, data);
    }
});

function pathIncludes(lookingFor) {
    if (window.location.pathname.includes(`/${lookingFor}`)) return true;
    return false;
}