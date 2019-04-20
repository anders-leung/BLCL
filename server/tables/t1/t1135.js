const fn = require('../helper');

// If header is changed, need to update the respective "findTableForRow" function in the front-end js

const table = {
    tables: [
        { name: 'T1', id: '#t1' },
        { name: 'Done', id: '#done' },
    ],
    columns: [
        { header: 'Husband Last Name', value: fn('husband.lastName') },
        { header: 'Husband First Name', value: fn('husband.firstName') },
        { header: 'Wife Last Name', value: fn('wife.lastName') },
        { header: 'Wife First Name', value: fn('wife.firstName') },
        { header: 'T1135 H', value: fn('husband.t1135.value') },
        { header: 'T1135 W', value: fn('wife.t1135.value') },
        { header: 'T1e Remarks', value: fn(), field: 't1Remarks', classes: ['edit'] },
        { header: 'Signed H', value: fn(), field: 'husband.signed' },
        { header: 'Signed W', value: fn(), field: 'wife.signed' },
        { header: 'T1135 EFILED H', value: fn(), field: 'husband.t1135.efiled',  classes: ['date-edit'], color: 'red' },
        { header: 'T1135 EFILED W', value: fn(), field: 'wife.t1135.efiled', classes: ['date-edit'], color: 'red' },
        { header: 'Rec\'d By', value: fn(), field: 'recBy', color: 'red' },
    ]
}

module.exports = table;