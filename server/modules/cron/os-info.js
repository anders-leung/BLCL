const schedule = require('node-schedule');

// const frequency = '0 */5 * * * *';
const frequency = '*/30 * * * * *';
const day = 1000 * 60 * 60 * 24;

const query = {
    interviewDate: {
        $lte: new Date(new Date() - day * 3),
    },
    preparerDone: { $ne: 'OK' },
    outstandingInfo: {
        $exists: true,
        $ne: '',
    },
    $or: [
        { notified: { $lte: new Date(new Date() - day * 3) } },
        { notified: { $exists: false } },
    ],
};

const notification = schedule.scheduleJob(frequency, () => {
    const notify = require('../t1/notify');
    notify(query, 'os-info');
});