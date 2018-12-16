const jade = require('jade');
const nodemailer = require('nodemailer');

module.exports = function emailClient(user, client, template, values, options) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.1and1.com',
        port: 587,
        secure: false,
        auth: {
            user: user.email,
            pass: user.emailPassword
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
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ', info.messageId);
    });
}