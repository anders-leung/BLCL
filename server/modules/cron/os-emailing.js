const schedule = require('node-schedule');

const frequency = '0 */5 * * * *';
const day = 1000 * 60 * 60 * 24;

const notPaid = {
    $or: [
        { pytReceived: '' },
        { pytReceived: { $exists: false } },
    ]
};

const neverEmailed = Object.assign({
    signDate: {
        $lte: new Date(new Date() - day * 5),
    },
    emailed: {
        $exists: false
    },
}, notPaid);

const emailedBefore = Object.assign({
    signDate: {
        $exists: true,
    },
    'emailed.when': {
        $lte: new Date(new Date() - day * 10),
    },
    'emailed.attempt': {
        $gte: 1,
    }
}, notPaid);

const firstEmail = schedule.scheduleJob(frequency, () => {
    const osEmail = require('../invoice/os-emailing');
    osEmail(neverEmailed)
});

const otherEmail = schedule.scheduleJob(frequency, () => {
    const osEmail = require('../invoice/os-emailing');
    osEmail(emailedBefore)
});