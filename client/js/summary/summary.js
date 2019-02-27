$(document).ready(function() {
    var table = $('table').DataTable({
        'select': true,
        'scrollX': false,
        'paging': false,
        'searching': false,
        'dom': 'RlBfrtip',
        'buttons': [{
            extend: 'excelHtml5',
            footer: true,
            title: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) + ' Summary',
            exportOptions: {
                columns: ':visible'
            }
        }],
        
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
        },
        
    });
});