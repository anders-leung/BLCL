const twilio = require('twilio');
let tclient;

module.exports = function textClient(client, template, cb) {
    if (!tclient) {
        tclient = new twilio(global.twilio.accountSid, global.twilio.token);
    }
    
    tclient.messages.create({
        // body: template.body,
        // from: '+17786546339',
        // to: `+1${client.number.replace(/[()\-\s]/g, '')}`,
        body: 'Test message',
        from: '+15005550006',
        to: '+17788670616'
    })
    .then((message) => {
        console.log('twilio message: ', message.sid);
        cb();
    });
}