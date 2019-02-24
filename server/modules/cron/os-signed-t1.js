const schedule = require('node-schedule');

const frequency = '0 */5 * * * *';
const day = 1000 * 60 * 60 * 24;

const query = {
    emailed: '',
    packed: { $exists: true, $ne: null },
    pytDate: { $lte: new Date(new Date() - day * 4) },
    $and: [
        {
            $or: [
                {
                    'husband.firstName': { $ne: '' },
                    'husband.signed': { $eq: null },
                    'wife.firstName': { $eq: '' }
                },
                {
                    'wife.firstName': { $ne: '' },
                    'wife.signed': { $eq: null },
                    'husband.firstName': { $eq: '' }
                },
                {
                    'husband.firstName': { $ne: '' },
                    'wife.firstName': { $ne: '' },
                    $or: [
                        { 'husband.signed': { $eq: null } },
                        { 'wife.signed': { $eq: null } }
                    ]
                }
            ],
        },
        {
            $or: [
                { notified: { $lte: new Date(new Date() - day * 4) } },
                { notified: { $exists: false } },
            ],            
        }
    ]
}

const notification = schedule.scheduleJob(frequency, () => {
    const notify = require('../t1/notify');
    notify(query, 'os-signed-t1');
});