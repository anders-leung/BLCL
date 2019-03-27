const html = `p='Dear ' + attention + ','\n
br\n
p Thank you for entrusting our company to prepare your 2018 T1 General Tax Return.\n
p There is some outstanding data that we need after the interview day at our office, namely:\n
p=osInfo\n
p Please provide the data ASAP for us to complete your tax return to file with the CRA timely.\n
p Thank you for your assistance.\n\n
p 感謝您委託本公司辦理您2018年的個人稅事宜。\n
p 自上次見面後，煩請閣下尽早提供以上相关資料，以便我們於限時內辦妥你的稅表。多謝合作。\n
br\n
br\n
p Thanks and regards,\n
|   #{user}<br/>\n
|   Benjamin Leung & Co., Ltd<br/>\n
|   <strong>Chartered Professional Accountant</strong>\n
br\n
p *** This is an automatic outgoing message from our system ***`;

const text = `| Dear #{attention},\n\n
| Thank you for entrusting our company to prepare your 2018 T1 General Tax Return.\n
| There is some outstanding data that we need after the interview day at our office, namely:\n
| #{osInfo}\n
| Please provide the data ASAP for us to complete your tax return to file with the CRA timely.\n
| Thank you for your assistance.\n\n
| 感謝您委託本公司辦理您2018年的個人稅事宜。\n
| 自上次見面後，煩請閣下尽早提供以上相关資料，以便我們於限時內辦妥你的稅表。多謝合作。\n\n
| Thanks and regards,\n
| #{user}\n
| Benjamin Leung & Co., Ltd.\n
| Chartered Professional Accountant\n
| \n
| *** This is an automatic outgoing message from our system ***`;

module.exports = { html, text };