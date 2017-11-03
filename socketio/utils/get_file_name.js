/**
 * Created by ander on 2017-11-01.
 */

function getFileName(row) {
    var husbandLastName = $(row).find('td:nth-child(12)').html();
    var husbandFirstName = $(row).find('td:nth-child(13)').html();
    var wifeLastName = $(row).find('td:nth-child(14)').html();
    var wifeFirstName = $(row).find('td:nth-child(15)').html();

    var fileName = '';

    if (husbandFirstName) {
        fileName += husbandLastName + ', ' + husbandFirstName;
        if (wifeFirstName) {
            fileName += ' and ';
            fileName += wifeLastName + ', ' + wifeFirstName;
        }
    } else {
        fileName += wifeLastName + ', ' + wifeFirstName;
    }
    return fileName;
}