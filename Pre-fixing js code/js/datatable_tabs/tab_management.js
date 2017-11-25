/**
 * Created by ander on 2017-11-22.
 */
function adjustTables() {
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
}

$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    adjustTables();
});