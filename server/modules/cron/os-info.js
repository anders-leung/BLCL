const schedule = require('node-schedule');

const frequency = '0 */5 * * * *';
const day = 1000 * 60 * 60 * 24;

const neverEmailed = {
    interviewDate: {
        $lte: new Date(new Date() - day * 3),
    },
    outstandingInfo: {
        $exists: true,
        $ne: '',
    }
};

const firstEmail = schedule.scheduleJob(frequency, () => {
    const osEmail = require('../invoice/os-emailing');
    osEmail(neverEmailed)
});

// const otherEmail = schedule.scheduleJob(frequency, () => {
//     const osEmail = require('../invoice/os-emailing');
//     osEmail(emailedBefore)
// });