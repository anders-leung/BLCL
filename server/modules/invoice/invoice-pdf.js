const fs = require('fs');
const PDFDocument = require('pdfkit');
const ConfigService = require('../config');

const margin = 72;
const lineWidth = 1.5;
const contentLimit = 350;
let width = 0;

const company = {
    blcl: {
        title: 'Benjamin  Leung  &  Co.,  Ltd.',
        cpa: 'Chartered Professional Accountant',
        address1: '202-4800 No. 3 Road',
        address2: 'Richmond, B.C. V6X 3A6',
        contact: 'Tel: (604) 273-8385 Fax: (604) 273-8319',
        email: 'Email: info@ben-cpa.com',
        gst: 'R873565923',
        footer: 'Accounts are due & payable upon presentation',
        finePrint: 'Carrying charges after 30 days are 1.5% per month, compounded monthly, annual interest rate is 19.57%',
    },
    cantrust: {
        title: 'Cantrust  Business  Service  Ltd.',
        address1: '201-4800 No. 3 Road',
        address2: 'Richmond, B.C. V6X 3A6',
        phone: 'Tel: (604) 273-8304 Fax: (604) 273-8319',
        email: 'Email: cantrust.business@gmail.com',
        gst: 'R886677491',
        footer: 'Accounts are due & payable upon presentation',
        finePrint: 'Carrying charges after 30 days are 1.5% per month, compounded monthly, annual interest rate is 19.57%',
    }
}

module.exports = async (invoice) => {
    const InvoiceService = require('./invoice');
    const [configErr, directory] = await ConfigService.getInvoiceDirectory();
    const [invoiceErr, getInvoice] = await InvoiceService.get({ _id: invoice._id });
    invoice = getInvoice[0];

    const doc = new PDFDocument({
        margins: {
            top: 36,
            bottom: 22,
            left: 72,
            right: 72,
        }
    });
    
    width = doc.page.width - margin * 2;

    const path = `${directory}/${invoice.company.toUpperCase()}/Invoice${invoice.number}.pdf`;
    const writeStream = fs.createWriteStream(path);
    doc.pipe(writeStream);
    // doc.pipe(fs.createWriteStream(directory + '/Invoice' + 0 + '.pdf'));
    doc.lineWidth(lineWidth);

    const companyFields = company[invoice.company];
    setHeader(doc, companyFields);
    doc.moveDown(1);
    setAttention(doc, invoice);
    doc.moveDown(3);
    setContent(doc, invoice);
    setFooter(doc, invoice);

    doc.end();
    
    const end = new Promise((resolve, reject) => {
        writeStream.on('finish', () => resolve());
        writeStream.on('end', () => resolve());
        writeStream.on('error', () => reject());
    });

    await end;
    return path;
}

const setHeader = (doc, companyFields) => {
    doc.font('Times-Bold');
    doc.fontSize(16);
    doc.text(companyFields.title.toUpperCase(), { align: 'center' });

    if (Object.keys(companyFields).includes('cpa')) {
        doc.moveDown(0.2)
        doc.fontSize(12);
        doc.text(companyFields.cpa, { align: 'center' });
    }

    const skip = ['title', 'cpa', 'gst', 'footer', 'finePrint'];
    doc.fontSize(10);
    for (const field in companyFields) {
        if (skip.includes(field)) continue;
        doc.moveDown(0.2);
        doc.text(companyFields[field], { align: 'center' });
    }
}

const addDivider = (doc, x, y) => {
    doc.lineCap('butt')
        .moveTo(x, y)
        .lineTo(doc.page.width - margin, y)
        .stroke();
}

const setAttention = (doc, invoice) => {
    const gst = company[invoice.company].gst;
    const client = invoice.client;
    const dateString = invoice.issueDate.toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
    });

    const column1 = 72;
    const column2 = margin * 1.5;
    const column3 = width * .7 + margin;

    const to = [
        { value: 'To:', start: column1, fontSize: 12 },
        { value: client.name, start: column2, },
        { value: 'Date:', start: column3, },
        { value: dateString, font: 'Times-Roman' },
    ]

    const address = [{ value: (client.address ? client.address.fullAddress : ''), start: column2, fontSize: 9 }];

    let phonesString = '';
    if (client.phone) phonesString += `TEL: ${client.phone}  `;
    if (client.fax) phonesString += `FAX: ${client.fax}`;
    const phones = [{ value: phonesString, start: column2, fontSize: 9 }];

    const email = [{ value: `EMAIL: ${client.email}`, start: column2, fontSize: 9 }];

    const invoiceNumber = [
        { value: 'Invoice No.:', start: column3, font: 'Times-Bold', fontSize: 12 },
        { value: invoice.number.toString(), font: 'Times-Roman' },
    ]

    const attn = [
        { value: 'Attn.:', start: column1, font: 'Times-Bold', fontSize: 12 },
        { value: client.contactString, start: column2, font: 'Times-Roman' },
        { value: 'GST NO.', start: column3, font: 'Times-Bold' },
        { value: gst, font: 'Times-Roman' },
    ]
    
    addDivider(doc, doc.x, doc.y);
    doc.y += lineWidth;
    
    const lines = splitLine(doc, to[1].value, 230);
    for (var i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (i === 0) {
            to[1].value = line;
            writeLine(doc, to, 2);
        } else {
            writeLine(doc, [{ value: line, start: column2, font: 'Times-Bold' }], 0.1);
        }
    }

    // writeLine(doc, to, 2);
    doc.font('Times-Roman');
    doc.fontSize(9)
    doc.moveDown(0.25);
    const addressLines = splitLine(doc, address[0].value, 230);
    for (var i = 0; i < addressLines.length; i++) {
        const line = addressLines[i];
        if (line) writeLine(doc, { value: line, start: column2 }, 0.1);
    }
    
    if (phonesString) writeLine(doc, phones, 0.1);
    if (client.email) writeLine(doc, email, 0.1);
    
    doc.y = 230;
    writeLine(doc, invoiceNumber);
    writeLine(doc, attn, 1);
    doc.moveDown(2);
    addDivider(doc, doc.x, doc.y);
}

const setContent = (doc, invoice) => {
    doc.font('Times-Roman');
    doc.fontSize(12);
    doc.text('TO PROFESSIONAL SERVICES FOR');
    doc.moveDown(1);

    let gstSum = 0;
    let pstSum = 0;
    for (const service of invoice.services) {
        const lines = splitLine(doc, service.details, contentLimit);
        for (var i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (i === 0) {
                writeLine(doc, [
                    { value: line, start: margin },
                    { value: `$${numberWithCommas(service.amount)}`, }
                ], 1);
            } else {
                writeLine(doc, [{ value: line, start: margin }], 0.1);
            }
        }
        gstSum += parseFloat(service.gst);
        if (service.pst) pstSum += parseFloat(service.pst);
    }

    writeLine(doc, [
        { value: '5% GST', start: margin },
        { value: `$${numberWithCommas(convert(gstSum))}`}
    ], 3);

    if (pstSum > 0) {
        writeLine(doc, [
            { value: '7% PST', start: margin },
            { value: `$${numberWithCommas(convert(pstSum))}`}
        ], 1);
    }
}

const setFooter = (doc, invoice) => {
    let size = 9;
    doc.font('Times-Roman');
    doc.fontSize(size);
    doc.y = doc.page.height - doc.page.margins.bottom - 22 - size;

    if (invoice.company === 'blcl') {
        const line1 = [{ value: 'Pleased be advised that the Swift Code to transfer money is TDOMCATTTOR', start: margin * 1.5 }];
        const line2 = [{ value: 'For the Account of Benjamin Leung & Co. Ltd. Account No. 97250-004-0176-5211426', start: margin * 1.5 }];
        const line3 = [
            { value: '(2)', font: 'Times-Bold', start: 72 },
            { value: 'E-Transfer to our email address accounts@ben-cpa.com OR', font: 'Times-Roman', start: margin * 1.5 },
        ];
        const line4 = [
            { value: '(1)', font: 'Times-Bold', start: 72 },
            { value: 'Issue a cheque payable to Benjamin Leung & Co. Ltd.', font: 'Times-Roman', start: margin * 1.5 },
        ];
        const line5 = [{ value: 'Settlement of Invoice', font: 'Times-Bold', start: margin }];

        writeLine(doc, line1);
        doc.y -= 20;
        writeLine(doc, line2);
        doc.y -= 20;
        writeLine(doc, line3);
        doc.y -= 20;
        writeLine(doc, line4);
        doc.y -= 20;
        writeLine(doc, line5);
        doc.x = margin;
        doc.y -= 20;
    }

    if (invoice.company === 'blcl') doc.font('Times-Italic');
    doc.text(company[invoice.company].finePrint);

    doc.y -= size;
    size = 10;
    doc.y -= size;
    doc.font('Times-Bold');
    doc.fontSize(size);
    doc.text(company[invoice.company].footer.toUpperCase());

    doc.y -= size + 6;
    addDivider(doc, doc.x, doc.y);

    doc.y -= 15;
    doc.font('Times-Roman')
    doc.fontSize(8);
    doc.text(`BL/${invoice.issuedBy.toLowerCase()}`);

    doc.y -= 35;
    writeLine(doc, [
        { value: 'TOTAL FEE', start: margin, fontSize: 12, },
        { value: `$${numberWithCommas(invoice.total)}` }
    ]);

    const y = doc.y;

    doc.lineWidth(1);
    doc.lineCap('butt')
        .moveTo(doc.page.width - margin - 60, y)
        .lineTo(doc.page.width - margin, y)
        .stroke();
    
    doc.moveTo(doc.page.width - margin - 60, y + 3)
        .lineTo(doc.page.width - margin, y + 3)
        .stroke();
        
    doc.dash(5, { space: 3 })
        .moveTo(doc.page.width - margin - 60, y - 20)
        .lineTo(doc.page.width - margin, y - 20)
        .stroke();
}

const writeLine = (doc, line, moveDown) => {
    if (!line[0].value) return;
    if (moveDown) doc.moveDown(moveDown);
    
    let offset = 0;
    let extraLines = [];
    const options = { continued: true };
    const splitLines = line[0].value.split('\r\n');
    if (splitLines.length > 1)  {
        line[0].value = splitLines[0];
        extraLines = splitLines.slice(1);
    }

    line.map((token, index) => {
        if (index + 1 === line.length) delete options.continued;
        if (token.font) doc.font(token.font);
        if (token.fontSize) doc.fontSize(token.fontSize);

        const stringWidth = doc.widthOfString(token.value);
        if (token.start) {
            doc.text(token.value, token.start - offset, doc.y, options);
        } else {
            const start = width + margin - stringWidth - offset;
            doc.text(token.value, start, doc.y);
        }
        offset += stringWidth;
    });

    extraLines.map((line) => {
        doc.text(line);
    });
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convert(value) {
    const tokens = value.toString().split('.');
    if (tokens.length === 1) return value + '.00';
    const integer = tokens[0];
    var decimal = tokens[1];
    if (decimal.length > 2) {
        if (decimal[2] > 4) {
            decimal = decimal.substring(0, 1) + (Number(decimal[1]) + 1);
        }
    } else {
        decimal = decimal + '0';
    }
    return integer + '.' + decimal.substring(0, 2);
}

const splitLine = (doc, line, limit) => {
    const lines = [line];
    let index = 0;
    let overflow = [];
    while (doc.widthOfString(lines[index]) > limit) {
        const tokens = lines[index].split(' ');
        lines[index] = tokens.slice(0, tokens.length - 1).join(' ');
        overflow.unshift(tokens[tokens.length - 1]);
        if (doc.widthOfString(lines[index]) <= limit) {
            if (overflow.length > 0) {
                index++;
                lines[index] = overflow.join(' ');
                overflow = [];
            }
        }
    }   
    return lines;
}

// const writeLine = (doc, line, moveDown) => {
//     if (moveDown) doc.moveDown(moveDown);
//     const options = { continued: true };
//     let offset = 0;
//     line.map((token, index) => {
//         if (index + 1 === line.length) delete options.continued;
//         if (token.font) doc.font(token.font);
//         if (token.fontSize) doc.fontSize(token.fontSize);

//         const stringWidth = doc.widthOfString(token.value);
//         if (token.start) {
//             const nextToken = line[index + 1];
//             if (index + 1 < line.length && nextToken.start) {
//                 const width = { width: nextToken.start - token.start - 1 };
//                 const height = doc.heightOfString(token.value, width);
//                 if (height > doc._fontSize) {
//                     nextToken.y = doc.y - height/2 + doc._fontSize/2;
//                 }
//             }
//             doc.text(token.value, token.start - offset, token.y || doc.y, options);
//         } else {
//             const start = width + margin - stringWidth - offset;
//             doc.text(token.value, start, doc.y);
//         }
//         offset += stringWidth;
//     });
// }