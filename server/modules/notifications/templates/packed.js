const html = `p='Dear ' + attention + ','\n
br\n
p Your #{year} T1 General Tax Return is ready to be picked up.\n
p Please bring your cheques for payment to CRA and to Benjamin Leung & Co., Ltd. when you come up to sign your return.\n
br\n
br\n
p Thanks and regards,\n
|   Benjamin Leung & Co., Ltd<br/>\n
|   <strong>Chartered Professional Accountant</strong>`;

const text = `| Dear #{attention},\n
| \n
| Your #{year} T1 General Tax Return is ready to be picked up.\n
| Please bring your cheques for payment to CRA and to Benjamin Leung & Co., Ltd. when you come up to sign your return.\n
| \n
| Thanks and regards,\n
| Benjamin Leung & Co., Ltd\n
| Chartered Professional Accountant`

module.exports = { html, text };