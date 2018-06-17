/**
 * Created by ander on 2017-09-20.
 */
module.exports = function(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month.toString().length == 1) {
        month = '0' + month;
    }

    if (day.toString().length == 1) {
        day = '0' + day;
    }

    return year + '-' + month + '-' + day;
};