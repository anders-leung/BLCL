const nodemailer = require('nodemailer');

module.exports = function emailClient(user, client, template, values) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.1and1.com',
        port: 587,
        secure: false,
        auth: {
            user: user.email,
            pass: user.password
        }
    });
    
    let mailOptions = {
        from: '"' + user.name + '" <' + user.email + '>',
        to: client.email
    }

    let template = require('./templates/' + template);

    mailOptions = Object.assign(mailOptions, template(client));
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ', info.messageId);
    });
}