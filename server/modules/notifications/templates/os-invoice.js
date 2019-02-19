const html = `p='Dear ' + attention + ','\n
br\n
p We do not appear to have received your payment to our Invoice No. #{number} for $#{amount} on #{date} as attached, and look forward to your early settlement.\n
p If you have any questions, please contact Shirley Lau at (604) 273-8385 ext. 102 or shirley@ben-cpa.com.\n
p Please ignore this reminder should you have paid before today.\n
br\n
br\n
p Thanks and regards,\n
|   #{user}<br/>\n
|   Benjamin Leung & Co., Ltd<br/>\n
|   <strong>Chartered Professional Accountant</strong>`;

const text = `| Dear #{attention},\n\n
| We do not appear to have received your payment to our invoice No. #{number} for #{amount} on #{date}, as attached, and look forward to your early settlement.\n
| If you have any questions, please contact Shirley Lau at (604) 273-8385 ext. 102 or shirley@ben-cpa.com.\n
| Should you have paid before today, please ignore this reminder.\n\n
| Thanks and regards,\n
| #{user}\n
| Benjamin Leung & Co., Ltd.\n
| Chartered Professional Accountant\n`;

module.exports = { html, text };