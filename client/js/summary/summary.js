$(document).ready(function() {
    var table = $('table').DataTable({
        'iDisplayLength': 10,
        'select': true,
        'scrollX': false,
        'paging': false,
        'searching': false,
        'columnDefs': [
            { type: 'date', targets: [0, 7] },
        ],
        
        drawCallback: function() {
            var api = this.api();
            api.columns().every(function() {
                var sum = 0;
                var values = this.data();
                for (var i = 0; i < values.length; i++) {
                    sum += parseInt(values[i]);
                }
                $(this.footer()).html(sum);
            });
        }
    });
});