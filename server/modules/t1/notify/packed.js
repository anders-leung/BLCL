const UserService = require('../../user');
const T1Service = require('../client');
const email = require('../../email/email');
const sms = require('../../sms/sms');

async function packed(query) {
    let err, t1s;

    [err, t1s] = await T1Service.get(query);

    if (err) return console.log('packed err: ', err);

    // if (process.env.NODE_ENV === 'test') return;

    UserService.getAllUsers((err, users) => {
        if (err || !users) return console.log('packed error: ', err || new Error('No users found'));

        t1s.map(async (t1) => {
            const { preparer, email, cell } = t1;
            let employee;
            users.forEach((user) => {
                if (user.initials === preparer) {
                    employee = user;
                }
            });
            
            const values = {
                attention: t1.filename,
                date: t1.issueDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
                user: employee.name,
            }

            if (cell.number[0]) {
                sms(cell.number[0], 'packed', values, (err) => {
                    if (!err) {
                        T1Service.updateClient({ _id: t1._id }, { notified: new Date() }, (err) => {
                            if (err) console.log('packed notification error updating client: ', err);
                        });
                    }
                });
            } else if (email.value) {
                const options = {
                    subject: `Benjamin Leung & Co., Ltd T1 Ready for Pickup`,
                    cc: `${employee.name} <${employee.email}>`,
                }
    
                email(employee, client, 'jade', values, options, async (err, success) => {
                    if (success) {
                        T1Service.updateClient({ _id: t1._id }, { notified: new Date() }, (err) => {
                            if (err) console.log('packed notification error updating client: ', err);
                        });
                    }
                });
            }
        });
    });
}

module.exports = packed;