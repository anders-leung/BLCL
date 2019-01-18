const fn = require('../helper');

// If header is changed, need to update the respective "findTableForRow" function in the front-end monitoring.js

function includes(name) {
    return new Function('client', `
        if (!client.services || client.services.length === 0) {
            return '';
        }

        return client.services.filter((service) => {
            return service.name.includes(${name});
        }).length > 0;
    `);
}

function time(field, lastYear) {
    return new Function('client', `
        const time = client.time;
        if (!time) return '';
        
        let year = time.length;
        if (${lastYear}) {
            year -= 1;
        }

        year = client[year];
        if (!year) return '';
        
        return client[last][${field}];
    `)
}

const tableSetup = [
    { header: 'BK', value: includes('BK') },
    { header: 'T2', value: includes('T2') },
    { header: 'PR', value: includes('PR') },
    { header: 'T4', value: includes('T4') },
    { header: 'T5', value: includes('T5') },
    { header: 'T1', value: includes('T1') },
    { header: 'GST', value: includes('GST') },
    { header: 'T1135', value: includes('T1135') },
    { header: 'Rec Date', value: fn(), field: 'job.in' },
    { header: 'Name', value: fn('client.name') },
    { header: 'Year End', value: fn('client.yearEnd') },
    { header: 'Due Date', value: fn(), field: 'due', classes: ['date-edit'] },
    { header: 'Tx Pyb last year', value: fn(), field: 'taxOwing' },
    { header: 'Preparer', value: fn(), field: 'preparer', classes: ['select', 'initials'] },
    { header: 'Preparer Start', value: fn(), field: 'job.start', classes: ['date-edit'] },
    { header: 'Preparer Done', value: fn(), field: 'job.finish', classes: ['date-edit'] },
    { header: 'File Closed', value: fn(), field: 'fileClosed' },
    { header: 'Remark', value: fn(), field: 'remarks.monitoring', classes: ['edit'] },
    { header: 'Time use Last year', value: time('actual', true), classes: ['edit'] },
    { header: 'Time Allot this year', value: time('estimated', false), classes: ['edit'] },
    { header: 'Actual Time', value: time('actual', false), classes: ['edit'] },
    { header: 'Variance', value: time('variance', false), classes: ['edit'] },
]

module.exports = tableSetup;