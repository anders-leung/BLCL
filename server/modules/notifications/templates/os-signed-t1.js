const html = `p='Dear ' + attention + ','\n
br\n
p Please return us the form T183 of your 2018 T1 General Tax Return duly signed, without which the CRA does not allow us to efile your completed 2018 T1.\n
br\n
br\n
p Thanks and regards,\n
|   #{user}<br/>\n
|   Benjamin Leung & Co., Ltd<br/>\n
|   <strong>Chartered Professional Accountant</strong>`;

const text = `| Dear #{attention}\n
| \n
| Please return us the form T183 of your 2018 T1 General Tax Return duly signed, without which the CRA does not allow us to efile your completed 2018 T1.\n
| \n
| Thanks and regards,\n
| Benjamin Leung & Co., Ltd<br/>\n
| Chartered Professional Accountant`;

module.exports = { html, text };