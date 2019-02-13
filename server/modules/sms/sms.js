const twilio = require('twilio');
const accountSid = 'AC05e155b7efa12cfcd26f5adbfbf15a94';
const token = 'be690cf0c56f3f21320c403803406577'
const tclient = new twilio(accountSid, token);

module.exports = function textClient(client, template, cb) {
    tclient.messages.create({
        body: 'Test message',
        from: '+17786546339'
    })
    .then((message) => {
        console.log('twilio message: ', message.sid);
        cb();
    });
}