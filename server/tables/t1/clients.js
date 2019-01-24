const fn = require('../helper');

// If header is changed, need to update the respective "findTableForRow" function in the front-end js

const table = {
    tables: [
        { name: 'New', id: '#new' },
        { name: 'WIP', id: '#wip' },
        { name: 'Ok', id: '#ok' },
        { name: 'Emailed', id: '#emailed' },
        { name: 'Done', id: '#done' },
    ],
    columns: [
        { header: 'Slips', value: fn('slips') },
        { header: 'Self Empl', value: fn('selfEmployed') },
        { header: 'GST', value: (client) => {
            let husband = fn('husband.rental.gstReturn')(client);
            let wife = fn('wife.rental.gstReturn')(client);
            return husband || wife ? 'Y' : '';
        } },
        { header: 'T1135 H', value: fn('husband.t1135.value') },
        { header: 'T1135 W', value: fn('wife.t1135.value') },
        { header: 'Rental', value: fn('rental') },
        { header: '777', value: fn('t777') },
        { header: 'Stock', value: fn('stocks') },
        { header: 'New', value: fn('new'), color: 'red' },
        { header: 'CFM PU', value: fn('confirmPickupDate'), color: 'red' },
        { header: 'Pickup Date', value: fn(), field: 'pickupDate', classes: ['date-edit'] },
        { header: 'Husband Last Name', value: fn('husband.lastName') },
        { header: 'Husband First Name', value: fn('husband.firstName') },
        { header: 'Wife Last Name', value: fn('wife.lastName') },
        { header: 'Wife First Name', value: fn('wife.firstName') },
        { header: 'Group', value: fn('group') },
        { header: 'My Remarks', value: fn(), field: 'preparerRemarks', classes: ['edit'] },
        { header: 'IN', value: fn('interviewer') },
        { header: 'PRE', value: fn(), field: 'preparer' },
        { header: 'PRE OK', value: fn(), field: 'preparerDone', classes: ['select', 'status'] },
        { header: 'CKR', value: fn(), field: 'checker', classes: ['select', 'initials'] },
        { header: 'Outstanding Info', value: fn(), field: 'outstandingInfo', color: 'green' },
        { header: 'Ready To PRT/Pack', value: fn(), field: 'readyToPack', classes: ['date-edit'] },
        { header: 'Signed', value: fn(), field: 'signed', classes: ['date-edit'], color: 'red' },
        { header: 'Emailed to Si', value: fn(), field: 'emailed', classes: ['date-edit'], color: 'purple' },
        { header: 'Interview Date', value: fn('interviewDate') },
        { header: 'Phone Number', value: fn('tel.number') },
        { header: 'Cell', value: fn('cell.number') },
        { header: 'Email', value: fn('email.value') },
    ]
}

module.exports = table;