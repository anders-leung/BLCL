const jade = require('jade');
const twilio = require('twilio');
let tclient;

module.exports = function textClient(number, template, values, cb) {
    if (!tclient) {
        tclient = new twilio(global.twilio.accountSid, global.twilio.token);
    }
    
    const js = require(`./templates/${template}`);

    const text = jade.compile(js.text)(values);
    
    tclient.messages.create({
        body: text,
        from: '+17786546339',
        to: `+1${number.replace(/[()\-\s]/g, '')}`,
        // body: 'Test message',
        // from: '+15005550006',
        // to: '+17788670616'
    })
    .then((message) => {
        console.log('Twilio message sent: ', message.sid);
        cb();
    })
    .catch((err) => {
        console.log('Twilio message failed: ', err);
        cb(err);
    });
}