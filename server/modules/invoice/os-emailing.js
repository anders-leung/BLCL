const UserService = require('../user');
const InvoiceService = require('../invoice/invoice');
const emailClient = require('../email/email');

async function osEmail(query) {
    let err, invoices;

    [err, invoices] = await InvoiceService.get(query);

    if (err) return console.log('osEmailing err: ', err);

    UserService.getAllUsers((err, users) => {
        if (err) return console.log('Invoice error: ', err);

        const userDict = {};
        users.map((user) => {
            const { initials } = user;
            userDict[initials] = user;
        });
        invoices.map(async (invoice) => {
            let client = invoice.client;
            if (!client) {
                client = invoice.oneTimeClient;
            }

            const user = userDict[invoice.issuedBy];

            const values = {
                attention: client.contactString || client.name,
                number: invoice.number,
                amount: invoice.total,
                date: invoice.issueDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
                user: user.name,
                company: invoice.company,
            }

            let reminder = '1st';
            if (invoice.emailed) {
                const attempt = invoice.emailed.attempt;
                reminder = ordinalSuffixOf(attempt + 1);
            }
            reminder += ' Reminder';
    
            const options = {
                subject: `Benjamin Leung & Co., Ltd Outstanding Invoice, ${reminder}`,
                attachments: [{
                    filename: `Invoice ${invoice.number}.pdf`,
                    path: `${global.invoiceDirectory}/${invoice.company.toUpperCase()}/${invoice.number}.pdf`,
                    contentType: 'application/pdf'
                }],
                cc: 'Accounts Receivable <ar@ben-cpa.com>',
            }

            emailClient(user, client, 'os', values, options, async (err, success) => {
                if (success) {
                    let attempt = 1;
                    if (invoice.emailed && invoice.emailed.attempt) {
                        attempt = invoice.emailed.attempt + 1;
                    }
                    const query = { _id: invoice._id };
                    const update = {
                        emailed: {
                            when: new Date(),
                            attempt,
                        }
                    };
                    await InvoiceService.update(query, update);
                }
            });
        });
    });
}

function ordinalSuffixOf(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

module.exports = osEmail;