const T1Service = require('./client');
const UserService = require('../user');
const emailClient = require('../notifications/email');
const sms = require('../notifications/sms');

async function notify(query, type) {
    let err, t1s;

    [err, t1s] = await T1Service.get(query);

    if (err) return console.log('os-pyt-t1 err: ', err);

    if (process.env.NODE_ENV === 'test') return;

    UserService.getAllUsers((err, users) => {
        if (err) return console.log('T1 OS get all users err: ', err);

        t1s.map(async (t1) => {
            let employee;
            const { preparer, email, cell } = t1;
            const values = {
                attention: t1.attention,
                year: t1.year,
            }

            if (type === 'os-info') {
                values.osInfo = t1.outstandingInfo;
                users.forEach((user) => {
                    if (user.initials === preparer) {
                        employee = user;
                    }
                });
            }

            if (email.value) {
                console.log(`Attempting to notify t1 client ${t1.attention} at ${email.value}`);
                let emailFrom = employee || global.t1;
                const client = { email: email.value }
                const options = {
                    subject: `Benjamin Leung & Co., Ltd. CPA`,
                    cc: `${emailFrom.name} <${emailFrom.email}>`,
                }

                values.user = emailFrom.name;

                emailClient(emailFrom, client, type, values, options, (err, success) => {
                    if (success) {
                        T1Service.updateClient({ _id: t1._id }, { notified: new Date() }, false, (err) => {
                            if (err) console.log(`${type} notification error updating client: `, err);
                        });
                    }
                });
            } else if (cell.number[0]) {
                console.log(`Attempting to notify t1 client ${t1.attention} at ${cell.number[0]}`);
                sms(cell.number[0], type, values, (err) => {
                    if (!err) {
                        T1Service.updateClient({ _id: t1._id }, { notified: new Date() }, false, (err) => {
                            if (err) console.log(`${type} notification error updating client: `, err);
                        });
                    }
                });
            }
        });
    });
}

module.exports = notify;