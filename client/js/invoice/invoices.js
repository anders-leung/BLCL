$(document).ready(function() {
    $('td').addClass('text-nowrap');
    
    $('table').each(function() {
        var tableId = '#' + $(this).attr('id');
        if (tableId == '#t2Table') {
            $('.tab-pane').each(function (i) {
                if (i == 0) {
                    $(this).addClass('in');
                    $(this).addClass('active');
                }
            });
        }
        setTable();
    });

    // function for setting up tables
    // function setTable(tableId) {
    function setTable() {
        // $(tableId + ' tfoot th').each( function (i) {
        $('table tfoot th').each( function (i) {
            //$(this).html(i);
            $(this).html( '<input type="text"/>' );
        });

        var table = $('table').DataTable({
            'columnDefs': [
                { type: 'date', targets: [4] },
            ],
            'select': true,
        });

        table.columns().every(function() {
            var that = this;
            $('input', this.footer()).on('keyup change', function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });

        // $(tableId).on('dblclick', 'tr td:not(.edit, .date-edit, .select)', function() {
        $('table').on('dblclick', 'tr td:not(.edit, .date-edit, .select)', function() {
            window.location = $(this).parent().data('href');
        });
    }
})

// function convert(value) {
//     const tokens = value.toString().split('.');
//     if (tokens.length === 1) return value + '.00';
//     const integer = tokens[0];
//     var decimal = tokens[1];
//     if (decimal.length > 2) {
//         if (decimal[2] > 4) {
//             decimal = decimal.substring(0, 1) + (Number(decimal[1]) + 1);
//         }
//     } else {
//         decimal = decimal + '0';
//     }
//     return integer + '.' + decimal.substring(0, 2);
// }