/**
 * Created by ander on 2017-09-20.
 */
module.exports = function(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month.length != 2) {
        month = '0' + month;
    }

    return year + '-' + month + '-' + day;
};