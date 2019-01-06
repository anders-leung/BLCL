const jade = require('jade');
const nodemailer = require('nodemailer');

module.exports = function emailClient(user, client, template, values, options, cb) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.1and1.com',
        port: 587,
        secure: false,
        auth: {
            user: user.email,
            pass: user.emailPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    const htmlFile = `${__dirname}/templates/${template}.jade`;
    const textFile = `${__dirname}/templates/${template}.txt`;

    const htmlFn = jade.compileFile(htmlFile);
    const textFn = jade.compileFile(textFile);

    const html = htmlFn(values);
    const text = textFn(values);
    
    let mailOptions = {
        from: user.name + '<' + user.email + '>',
        to: client.email,
        html,
        text,
    }
    mailOptions = Object.assign(mailOptions, options);
    
    transporter.sendMail(mailOptions, (error, info) => {
        let success = true;
        if (error) {
            success = false;
            console.log(error);
        } else {
            console.log('Message sent: ', info.messageId);
        }
        cb(error, success);
    });
}