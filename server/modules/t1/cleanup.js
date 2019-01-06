const mongoose = require('mongoose');
const Client = require('../../models/t1/Client');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test');

const fields = {
    strings: [
        'preparerDone', 'readyToPack', 'signed', 'pytReceived', 'pytAmount', 
        'pytDate', 'recBy', 'taxToCRA', 't1Efiled', 'gstEfiled', 'outstandingInfo',
        'remarks', 't1Remarks', 'gstRemarks', 'preparerRemarks', 'callDate',
        'emailed', 'interviewDate', 'pickupDate'
    ],
    bools: ['new', 'packed', 'confirmPickupDate'],
}

const update = {};

Object.keys(fields).map((type) => {
    let value = '';
    if (type === 'bools') value = false;
    fields[type].map((field) => {
        update[field] = value;
    });
});

Client.update({}, update, { multi: true }, (err, update) => {
    if (err) console.log('ERROR: ', err);
    else console.log(update);
});

Client.find({ preparer: { $exists: true, $ne: '' } }, (err, clients) => {
    if (err) console.log('ERROR: ', err);
    else {
        clients.map((client) => {
            const { preparer } = client;
            if (preparer) {
                client.oldPreparer = preparer;
                client.preparer = '';
            }
            client.save((err) => {
                if (err) console.log('ERROR: ', err);
            });
        });
    }
});