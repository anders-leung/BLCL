const moment = require('moment');

function getWeeks() {
    const weekRanges = [];
    let currentWeek = moment().week();
    for (let i = 0; i < 52; i++) {
        const beginningOfWeek = moment().week(currentWeek).startOf('week');
        const endOfWeek = moment().week(currentWeek).startOf('week').add(6, 'days');
        const range = `${beginningOfWeek.format('ll')} - ${endOfWeek.format('ll')}`;
        weekRanges.push(range);
        currentWeek--;
    }

    return weekRanges;
}

module.exports = getWeeks;