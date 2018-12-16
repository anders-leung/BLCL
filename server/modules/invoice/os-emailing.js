const schedule = require('node-schedule');

const UserService = require('../user');
const InvoiceService = require('../invoice/invoice');
const emailClient = require('../email/email');

const email = schedule.scheduleJob('* * 9 * * *', osEmail);

async function osEmail() {
    const firstEmail = {
        signDate: {
            $lte: new Date(new Date() - 1000 * 60 * 60 * 24 * 10),
        },
        emailed: {
            $exists: false
        }
    };


    let err, invoices;

    [err, invoices] = await InvoiceService.get(firstEmail);

    if (err) return console.log('osEmailing err: ', err);

    invoices.map(async (invoice) => {
        let client = invoice.client;
        if (!client) {
            client = invoice.oneTimeClient;
        }

        const [err, user] = await UserService.findOneUser({ initials: invoice.issuedBy });
        if (err) return console.log('Invoice error: ', err);

        const values = {
            attention: client.contactString || client.name,
            number: invoice.number,
            amount: invoice.total,
            date: invoice.issueDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
            user: user.name,
            company: invoice.company,
        }

        const options = {
            subject: 'Benjamin Leung & Co., Ltd Outstanding Invoice',
            attachments: [{
                filename: `Invoice ${invoice.number}.pdf`,
                path: `${global.invoiceDirectory}/${invoice.company.toUpperCase()}/${invoice.number}.pdf`,
                contentType: 'application/pdf'
            }]
        }

        emailClient(user, client, 'os', values, options);
    });
}

module.exports = osEmail;