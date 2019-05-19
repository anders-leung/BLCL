const fn = require('../helper');

// If header is changed, need to update the respective "findTableForRow" function in the front-end js

const table = {
    tables: [
        { name: 'GST', id: '#t1' },
        { name: 'Done', id: '#done' },
    ],
    columns: [
        { header: 'Husband Last Name', value: fn('husband.lastName') },
        { header: 'Husband First Name', value: fn('husband.firstName') },
        { header: 'Wife Last Name', value: fn('wife.lastName') },
        { header: 'Wife First Name', value: fn('wife.firstName') },
        { header: 'GSTe Remarks', value: fn(), field: 'gstRemarks', classes: ['edit'] },
        { header: 'Signed H', value: fn(), field: 'husband.signed' },
        { header: 'Signed W', value: fn(), field: 'wife.signed' },
        { header: 'GST EFILED', value: fn(), field: 'gstEfiled', classes: ['date-edit'] },
    ]
}

module.exports = table;