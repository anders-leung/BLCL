const fn = require('../helper');

// If header is changed, need to update the respective "findTableForRow" function in the front-end js

const table = {
    columns: [
        { header: 'Simple', value: fn('slips') },
        { header: 'Self Empl', value: fn('selfEmployed') },
        { header: 'GST', value: (client) => {
            let husband = fn('husband.rental.gstReturn')(client);
            let wife = fn('wife.rental.gstReturn')(client);
            return husband || wife ? 'Y' : '';
        } },
        { header: 'Rental', value: fn('rental') },
        { header: 'T1135 H', value: fn('husband.t1135.value') },
        { header: 'T1135 W', value: fn('wife.t1135.value') },
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
        { header: 'IN', value: fn('interviewer') },
        { header: 'PRE', value: fn(), field: 'preparer', classes: ['select', 'admin', 'initials'] },
        { header: 'PRE OK', value: fn(), field: 'preparerDone', classes: ['select', 'status', 'admin'] },
        { header: 'CKR', value: fn(), field: 'checker', classes: ['select', 'initials'] },
        { header: 'Outstanding Info', value: fn(), field: 'outstandingInfo', classes: ['edit'], color: 'green' },
        { header: 'Remarks', value: fn(), field: 'remarks', classes: ['edit'] },
        { header: 'Ready To PRT/Pack', value: fn(), field: 'readyToPack', classes: ['date-edit'] },
        { header: 'Packed', value: fn(), field: 'packed', classes: ['date-edit'] },
        { header: 'Method', value: fn('method') },
        { header: 'Rec\'d By', value: fn(), field: 'recBy', classes: ['select', 'initials'], color: 'red' },
        { header: 'Tax To CRA', value: fn(), field: 'taxToCRA', classes: ['select', 'tax'], color: 'red' },
        { header: 'PYT Type', value: fn(), field: 'pytReceived', classes: ['select', 'pytType'], color: 'red' },
        { header: 'PYT Amount', value: fn(), field: 'pytAmount', classes: ['edit'], color: 'red' },
        { header: 'Signed H', value: fn(), field: 'husband.signed', classes: ['date-edit'], color: 'red' },
        { header: 'Signed W', value: fn(), field: 'wife.signed', classes: ['date-edit'], color: 'red' },
        { header: 'Emailed to Si', value: fn(), field: 'emailed', classes: ['date-edit'], color: 'purple' },
        { header: 'Email/Call Pu', value: fn(), field: 'callDate', classes: ['date-edit'] },
        { header: 'Interview Date', value: fn('interviewDate') },
        { header: 'Phone Number', value: fn('tel.number') },
        { header: 'Cell', value: fn('cell.number') },
        { header: 'Email', value: fn('email.value') },
    ]
}

module.exports = table;