const schedule = require('node-schedule');

const frequency = '0 */5 * * * *';
const day = 1000 * 60 * 60 * 24;

const query = {
    emailed: '',
    packed: { $exists: true, $ne: null },
    pytReceived : '',
    $and: [
        {
            $or: [
                {
                    'husband.firstName': { $ne: '' },
                    'husband.signed': { $lte: new Date(new Date() - day * 4) },
                    'wife.firstName': { $eq: '' }
                },
                {
                    'wife.firstName': { $ne: '' },
                    'wife.signed': { $lte: new Date(new Date() - day * 4) },
                    'husband.firstName': { $eq: '' }
                },
                {
                    'husband.firstName': { $ne: '' },
                    'husband.signed': { $lte: new Date(new Date() - day * 4) },
                    'wife.firstName': { $ne: '' },
                    'wife.signed': { $lte: new Date(new Date() - day * 4) },
                }
            ],
        },
        {
            $or: [
                { notified: { $lte: new Date(new Date() - day * 7) } },
                { notified: { $exists: false } },
            ],
        }
    ]
}

const notification = schedule.scheduleJob(frequency, () => {
    const notify = require('../t1/notify');
    notify(query, 'os-pyt-t1');
});