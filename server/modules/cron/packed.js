const schedule = require('node-schedule');

const frequency = '0 */5 * * * *';
const day = 1000 * 60 * 60 * 24;

const packed = { $exists: true, $ne: null };
const notPickedUp = {
    'husband.signed': { $eq: null },
    'wife.signed': { $eq: null },
    emailed: '',
    pytReceived : '',
    pytAmount : '',
    recBy : '',
    taxToCRA : ''
}

const query = Object.assign({
    $or: [
        { notified: { $lte: new Date(new Date() - day * 4) } },
        { notified: { $exists: false } },
    ],
    packed,
}, notPickedUp);

const notification = schedule.scheduleJob(frequency, () => {
    const notify = require('../t1/notify');
    notify(query, 'packed');
});