$(document).ready(function() {
    $('table').DataTable({
        'select': true,
        'scrollX': false,
        'paging': false,
        'searching': false,
        'dom': 'RlBfrtip',
        'buttons': [{
            extend: 'excelHtml5',
            footer: true,
            title: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) + ' Report',
            exportOptions: {
                columns: ':visible'
            }
        }],        
    });
});