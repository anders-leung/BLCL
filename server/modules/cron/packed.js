const schedule = require('node-schedule');

const frequency = '*/30 * * * * *';
const day = 1000 * 60 * 60 * 24;

const neverNotified = {
    notified: { $exists: false },
    packed: { $lte: new Date(new Date() - day) },
};

const notifiedBefore = {
    notified: { $lte: new Date(new Date() - day * 5) },
    packed: { $exists: true, $ne: null },
}

const firstNotification = schedule.scheduleJob(frequency, () => {
    const packed = require('../t1/notify/packed');
    packed(neverNotified);
});

const otherEmail = schedule.scheduleJob(frequency, () => {
    const packed = require('../t1/notify/packed');
    packed(notifiedBefore);
});