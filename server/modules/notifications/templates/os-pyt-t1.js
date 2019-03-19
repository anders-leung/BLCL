const html = `p='Dear ' + attention + ','\n
br\n
p It appears that we have not received your payment for our service fee for preparing your #{year} T1 General Tax Return.\n
p Please be advised that we will not efile your tax return to the CRA until payment is received.\n
br\n
br\n
p Thanks and regards,\n
|   #{user}<br/>\n
|   Benjamin Leung & Co., Ltd<br/>\n
|   <strong>Chartered Professional Accountant</strong>
br\n
br\n
p *** This is an automatic outgoing message from our system ***`;

const text = `| Dear #{attention}\n
| \n
| It appears that we have not received your payment for our service fee for preparing your #{year} T1 General Tax Return.\n
| Please be advised that we will not efile your tax return to the CRA until payment is received.\n
| \n
| Thanks and regards,\n
| Benjamin Leung & Co., Ltd<br/>\n
| Chartered Professional Accountant`;

module.exports = { html, text };